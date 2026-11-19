#!/usr/bin/env python3
"""Genererer illustrasjonene i content/illustrations/scenes.json med ComfyUI på kitor (B-017).

Kjøres PÅ kitor, ved siden av scenes.json, med ComfyUIs Python (systemets python3 mangler Pillow):

    /opt/comfyui/.venv/bin/python generate_on_kitor.py --out out/zimage
    /opt/comfyui/.venv/bin/python generate_on_kitor.py --out out/zimage --only platon-hulen --force

Skriptet tar en eksklusiv `image`-lease i kitor-arbiter før første bilde og slipper den
til slutt, også ved feil. Ferdige bilder hoppes over, så en avbrutt kjøring kan startes
på nytt med samme kommando. Bildene lagres som WebP i --out; 960 px-variantene lages
lokalt med `npm run images` etter at filene er kopiert til public/images/hooks/.

Z-Image-Turbo er valgt (B-017); Qwen er beholdt som alternativ. Begge er Apache-2.0. MiniMax H3, som de første 48 bildene ble laget med, skal
ikke brukes: lisensen forbyr visning i EU, Storbritannia, USA og Sør-Korea og krever
KI-merking (se B-017).
"""
import argparse
import json
import os
import subprocess
import sys
import threading
import time
import urllib.request

from PIL import Image, ImageStat

COMFY_URL = 'http://localhost:8188'
COMFY_OUTPUT_DIR = '/mnt/truenas/ai/output/comfyui'
WEBP_QUALITY = 84
# Ett bilde tar 1–2 minutter med Qwen. Leasen fornyes hvert minutt, så dette er bare
# arbiterens øvre grense for hvor lenge vi ber om å holde GPU-en.
SECONDS_PER_IMAGE_BUDGET = 180
TIMEOUT_PER_IMAGE = 900
# Et bilde med lavere snittlysstyrke enn dette (0–255) regnes som mislykket. Feil
# attention-backend ga bilder med snitt 0,0; den mørkeste ekte scenen i prøven lå over 25.
MIN_MEAN_BRIGHTNESS = 5

MODELS = {
    # Qwen-Image-2512, Apache-2.0. Følger negativ prompt (cfg > 1).
    'qwen': {
        'unet': 'qwen-image-2512-fp8.safetensors',
        'clip': 'qwen_2.5_vl_7b_fp8_scaled.safetensors',
        'clip_type': 'qwen_image',
        'vae': 'qwen_image_vae.safetensors',
        # ComfyUI på kitor startes med --use-sage-attention, som gir helt svarte Qwen-bilder
        # (målt 2026-11-19). Denne modellen får derfor vanlig PyTorch-attention.
        'attention': 'pytorch attention',
        'shift': 3.1,
        'steps': 30,
        'cfg': 4.0,
        'sampler': 'euler',
        'scheduler': 'simple',
    },
    # Z-Image-Turbo, Apache-2.0. Destillert: cfg 1, så negativ prompt har ingen virkning.
    # Innstillingene er de Pondus bruker i drift.
    'zimage': {
        'unet': 'z_image_turbo_bf16.safetensors',
        'clip': 'qwen_3_4b.safetensors',
        # Som i ComfyUIs egen Z-Image-mal. Pondus bruker 'qwen_image', som også kjører.
        'clip_type': 'lumina2',
        'vae': 'ae.safetensors',
        'shift': 3.0,
        'steps': 8,
        'cfg': 1.0,
        'sampler': 'euler_ancestral',
        'scheduler': 'sgm_uniform',
    },
}


def build_graph(model, positive, negative, width, height, seed, prefix):
    m = MODELS[model]
    graph = {
        '1': {'class_type': 'UNETLoader', 'inputs': {'unet_name': m['unet'], 'weight_dtype': 'default'}},
        '2': {'class_type': 'CLIPLoader', 'inputs': {'clip_name': m['clip'], 'type': m['clip_type']}},
        '3': {'class_type': 'VAELoader', 'inputs': {'vae_name': m['vae']}},
        '4': {'class_type': 'CLIPTextEncode', 'inputs': {'clip': ['2', 0], 'text': positive}},
        '5': {'class_type': 'CLIPTextEncode', 'inputs': {'clip': ['2', 0], 'text': negative}},
        '6': {'class_type': 'EmptySD3LatentImage', 'inputs': {'width': width, 'height': height, 'batch_size': 1}},
        '7': {'class_type': 'ModelSamplingAuraFlow', 'inputs': {'model': ['11', 0], 'shift': m['shift']}},
        '8': {
            'class_type': 'KSampler',
            'inputs': {
                'model': ['7', 0], 'positive': ['4', 0], 'negative': ['5', 0], 'latent_image': ['6', 0],
                'seed': seed, 'steps': m['steps'], 'cfg': m['cfg'],
                'sampler_name': m['sampler'], 'scheduler': m['scheduler'], 'denoise': 1.0,
            },
        },
        '9': {'class_type': 'VAEDecode', 'inputs': {'samples': ['8', 0], 'vae': ['3', 0]}},
        '10': {'class_type': 'SaveImage', 'inputs': {'images': ['9', 0], 'filename_prefix': prefix}},
    }
    if 'attention' in m:
        graph['11'] = {'class_type': 'ModelAttentionBackend', 'inputs': {'model': ['1', 0], 'attention': m['attention']}}
    else:
        graph['7']['inputs']['model'] = ['1', 0]
    return graph


def seed_for(file_name):
    # Fast frø per scene: samme scene gir samme bilde ved ny kjøring, og frøet endres ikke
    # når andre scener legges til eller fjernes. Et mislykket bilde lages på nytt ved å gi
    # scenen et eget «seed» i scenes.json.
    return sum((i + 1) * ord(c) for i, c in enumerate(file_name)) % (2**31)


def run_graph(graph, timeout):
    req = urllib.request.Request(
        f'{COMFY_URL}/prompt', json.dumps({'prompt': graph}).encode(), {'Content-Type': 'application/json'}
    )
    prompt_id = json.load(urllib.request.urlopen(req))['prompt_id']
    started = time.time()
    while time.time() - started < timeout:
        history = json.load(urllib.request.urlopen(f'{COMFY_URL}/history/{prompt_id}'))
        if prompt_id in history:
            entry = history[prompt_id]
            errors = [
                m[1].get('exception_message', '')[:400]
                for m in entry['status'].get('messages', [])
                if m[0] == 'execution_error'
            ]
            if errors:
                raise RuntimeError('; '.join(errors))
            for output in entry.get('outputs', {}).values():
                for image in output.get('images', []):
                    return os.path.join(COMFY_OUTPUT_DIR, image.get('subfolder', ''), image['filename'])
            raise RuntimeError('ComfyUI ga ingen bildefil')
        time.sleep(2)
    raise TimeoutError(f'ingen svar etter {timeout} s')


def arbiter(*args):
    return subprocess.run(['kitor-arbiter', *args], capture_output=True, text=True, check=True).stdout


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument('--model', choices=sorted(MODELS), default='zimage', help='zimage er valgt i B-017')
    parser.add_argument('--out', required=True, help='mappe for ferdige WebP-filer')
    parser.add_argument('--scenes', default='scenes.json')
    parser.add_argument('--only', help='kommaseparerte filnavn (uten .webp)')
    parser.add_argument('--force', action='store_true', help='lag bildet på nytt selv om det finnes')
    parser.add_argument('--seeds', help='kommaseparerte frø: lag én variant per frø som <fil>--<frø>.webp, '
                        'så du kan velge. Vinnerens frø føres inn som «seed» i scenes.json.')
    parser.add_argument('--dry-run', action='store_true', help='skriv ut hva som ville blitt laget')
    args = parser.parse_args()

    with open(args.scenes, encoding='utf-8') as f:
        manifest = json.load(f)
    scenes = manifest['scenes']
    if args.only:
        wanted = set(args.only.split(','))
        unknown = wanted - {s['file'] for s in scenes}
        if unknown:
            sys.exit(f'Ukjente scener: {", ".join(sorted(unknown))}')
        scenes = [s for s in scenes if s['file'] in wanted]

    # Én jobb per bilde: (scene, frø, filnavn uten .webp).
    if args.seeds:
        jobs = [(s, int(seed), f"{s['file']}--{seed}") for s in scenes for seed in args.seeds.split(',')]
    else:
        jobs = [(s, s.get('seed', seed_for(s['file'])), s['file']) for s in scenes]

    os.makedirs(args.out, exist_ok=True)
    todo = [j for j in jobs if args.force or not os.path.exists(os.path.join(args.out, f'{j[2]}.webp'))]
    print(f'{len(jobs)} bilder valgt, {len(jobs) - len(todo)} finnes fra før, {len(todo)} skal lages med {args.model}.', flush=True)
    if args.dry_run or not todo:
        for _, _, name in todo:
            print(f'  {name}')
        return

    duration = len(todo) * SECONDS_PER_IMAGE_BUDGET + 600
    token = json.loads(
        arbiter('acquire', 'image', '--requester', 'filosofradar', '--label', f'illustrasjoner-{args.model}',
                '--duration-s', str(duration), '--priority', 'bakgrunn', '--json')
    )['token']
    print(f'GPU-lease tatt ({token[:8]}…).', flush=True)

    stop = threading.Event()

    def heartbeat():
        while not stop.wait(60):
            try:
                arbiter('heartbeat', token)
            except subprocess.CalledProcessError as e:
                print(f'Heartbeat feilet: {e.stderr.strip()}', flush=True)

    threading.Thread(target=heartbeat, daemon=True).start()

    failed = []
    try:
        for n, (scene, seed, name) in enumerate(todo, 1):
            positive = f"{scene['prompt']} {manifest['style']}"
            graph = build_graph(
                args.model, positive, manifest['negative'], manifest['width'], manifest['height'],
                seed, f'filosofradar/illustrasjoner/{args.model}/{name}',
            )
            started = time.time()
            try:
                png = run_graph(graph, TIMEOUT_PER_IMAGE)
            except (RuntimeError, TimeoutError, OSError) as e:
                failed.append(name)
                print(f'[{n}/{len(todo)}] {name}: FEIL {e}', flush=True)
                continue
            image = Image.open(png).convert('RGB')
            brightness = sum(ImageStat.Stat(image).mean) / 3
            if brightness < MIN_MEAN_BRIGHTNESS:
                failed.append(name)
                print(f'[{n}/{len(todo)}] {name}: FEIL nesten svart bilde (snitt {brightness:.1f})', flush=True)
                continue
            target = os.path.join(args.out, f'{name}.webp')
            image.save(target, 'WEBP', quality=WEBP_QUALITY, method=6)
            kb = os.path.getsize(target) // 1024
            print(f'[{n}/{len(todo)}] {name}: {round(time.time() - started)} s, {kb} kB', flush=True)
    finally:
        stop.set()
        arbiter('release', token)
        print('GPU-lease sluppet.', flush=True)

    if failed:
        sys.exit(f'{len(failed)} feilet: {", ".join(failed)}. Kjør samme kommando igjen for å prøve dem på nytt.')


if __name__ == '__main__':
    main()
