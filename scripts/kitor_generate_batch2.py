import glob
import json
import os
import subprocess
import sys
import threading
import time
import urllib.request
from PIL import Image

U = 'http://localhost:8188'
OUT_DIR = '/mnt/truenas/ai/output/comfyui'
WEBP_DIR = '/home/eirik/filosofradar_webp_batch2'
os.makedirs(WEBP_DIR, exist_ok=True)

SCENES = {
    'aristoteles-marmorstatuen': (
        'Atmospheric fine art oil painting in classical Greek chiaroscuro style. An ancient Athenian sculptor in his sunlit '
        'marble workshop, carving a magnificent monumental statue of Apollo from a massive rough block of glowing white marble. '
        'Marble dust motes float through dramatic golden sunbeams from high arched windows, with bronze hammer and steel chisel in hand. '
        'Rich warm stone textures, noble classical Greek antiquity, masterpiece, 4k.'
    ),
    'hume-biljardkulene': (
        'Atmospheric 18th-century Scottish library illuminated by a single warm overhead lamp beam. On a rich green velvet billiard table, '
        'an ivory billiard ball strikes a vibrant red billiard ball in a frozen moment of impact. Subtle ethereal cosmic stardust and glowing '
        'golden sparks hang suspended in mid-air at the point of contact, visualizing the mysterious invisible concept of causation. '
        'Deep mahogany bookshelves and dark obsidian shadows in background, chiaroscuro oil painting style, fine art.'
    ),
    'kant-morderen-ved-doren': (
        'Dramatic chiaroscuro oil painting in Rembrandt style. A heavy medieval wooden house door opened slightly on a dark rainy Prussian night. '
        'On the threshold stands an ominous hooded cloaked visitor in deep shadows demanding entry. From inside, warm golden candlelight '
        'catches the troubled thoughtful expression of a philosopher standing at the doorway, torn by a grave moral dilemma of duty and truth. '
        'Rich textures of wet wood, warm flame, deep dark night, masterpiece.'
    ),
    'nietzsche-lykten': (
        'A dramatic 19th-century atmospheric oil painting. A wild-eyed intense philosopher with a thick mustache running into a '
        'sun-drenched crowded European town marketplace at high noon, holding high in his hand a burning glowing kerosene lantern, searching intently. '
        'Startled merchants and citizens look on in amazement. Heavy dramatic storm clouds gathering above the sunlit square, vibrant chiaroscuro '
        'contrast between bright daylight and glowing lantern flame, masterpiece.'
    ),
    'sartre-kelneren': (
        'Atmospheric 1940s Parisian evening café bistro, dim amber lighting, cigarette smoke swirling through air, small round marble bistro tables. '
        'A sharply dressed French waiter in black vest, white apron and bow tie moves with exaggerated theatrical, robotic, overly precise movements '
        'while balancing a polished silver beverage tray, playing the role of a waiter like an actor in bad faith. Dark moody jazz-era existential atmosphere, cinematic oil painting style.'
    ),
    'popper-svanen': (
        'A serene, poetic and mysterious alpine lake at dusk beneath a cosmic starry night sky. Floating on the calm dark mirror-like water '
        'among a flock of peaceful white swans is a single magnificent, glowing jet-black swan spreading its powerful dark wings in the center, '
        'shattering certainty. Ethereal mist rising from the cool water, deep sapphire blue and golden starlight reflections, philosophical fine art masterpiece.'
    ),
    'wittgenstein-bille-eske': (
        'A dark atmospheric scholar study room with an antique dark walnut desk. A contemplative person gently lifts the lid of an intricately carved '
        'ornate wooden box, revealing a mesmerizing, glowing iridescent emerald and gold beetle shining in the interior shadow. In the soft background, '
        'other shadowy silhouettes hold their own closed mysterious boxes. Mysterious, thought-provoking chiaroscuro oil painting, rich colors, fine art.'
    ),
    'foucault-panoptikon': (
        'A massive, imposing Victorian panopticon prison rotunda in dark atmospheric chiaroscuro. Concentric circular tiers of backlit barred cells '
        'rise into towering shadows, all facing a menacing, monolithic central inspection tower with blinding harsh white searchlights piercing through '
        'the dusty darkness. Heavy dark atmosphere of unseen discipline and surveillance, cinematic oil painting style, architectural masterpiece.'
    ),
    'hobbes-leviathan': (
        'Dramatic stormy primeval landscape at twilight, barren hills and distant campfires of early humanity. Rising vast and semi-translucent '
        'above the stormy dark horizon is a colossal crowned sovereign monarch (the Leviathan), whose body, robes and armor are woven from thousands '
        'of tiny distinct human silhouettes moving as one, holding a shining steel sword in one hand and a golden crosier in the other over the misty realm. '
        'Epic philosophical artwork, masterpiece.'
    ),
    'zhuangzi-sommerfuglen': (
        'A poetic ancient Chinese landscape oil painting. A serene Daoist philosopher in flowing traditional robes resting peacefully on a '
        'moss-covered boulder beside a gentle winding stream under a blooming peach blossom tree at twilight. Around him, a mesmerizing swarm of '
        'radiant ethereal glowing blue and golden butterflies flutters into the starry twilight sky, blurring the boundary between dream and waking reality. '
        'Ethereal, tranquil, celestial, masterpiece.'
    )
}

def make_graph(prompt, width, height, seed, prefix):
    return {
        'unet': {
            'class_type': 'UNETLoader',
            'inputs': {'unet_name': 'minimax_h3_image_pruned_int8_convrot.safetensors', 'weight_dtype': 'default'}
        },
        'clip': {
            'class_type': 'CLIPLoader',
            'inputs': {'clip_name': 'qwen3vl_32b_minimax_h3_nvfp4_awq.safetensors', 'type': 'minimax', 'device': 'default'}
        },
        'vae': {
            'class_type': 'VAELoader',
            'inputs': {'vae_name': 'minimax_h3_image_vae_fp16.safetensors'}
        },
        'cond': {
            'class_type': 'MiniMaxH3ImageConditioning',
            'inputs': {'clip': ['clip', 0], 'vae': ['vae', 0], 'prompt': prompt, 'width': width, 'height': height}
        },
        'neg': {
            'class_type': 'ConditioningZeroOut',
            'inputs': {'conditioning': ['cond', 0]}
        },
        'ks': {
            'class_type': 'KSampler',
            'inputs': {
                'model': ['unet', 0], 'positive': ['cond', 0], 'negative': ['neg', 0],
                'latent_image': ['cond', 1], 'seed': seed,
                'steps': 6, 'cfg': 1.0, 'sampler_name': 'euler', 'scheduler': 'simple',
                'denoise': 1.0
            }
        },
        'dec': {
            'class_type': 'VAEDecode',
            'inputs': {'samples': ['ks', 0], 'vae': ['vae', 0]}
        },
        'save': {
            'class_type': 'SaveImage',
            'inputs': {'images': ['dec', 0], 'filename_prefix': prefix}
        }
    }

def run_prompt(name, g, limit=300):
    req = urllib.request.Request(U + '/prompt', json.dumps({'prompt': g}).encode(), {'Content-Type': 'application/json'})
    r = urllib.request.urlopen(req)
    pid = json.load(r)['prompt_id']
    t0 = time.time()
    while time.time() - t0 < limit:
        h = json.load(urllib.request.urlopen(f'{U}/history/{pid}'))
        if pid in h:
            s = h[pid]['status']
            status_str = s.get('status_str', 'unknown')
            err = [m[1].get('exception_message', '')[:400] for m in s.get('messages', []) if m[0] == 'execution_error']
            outs = []
            for o in h[pid].get('outputs', {}).values():
                for x in o.get('images', []):
                    outs.append(os.path.join(OUT_DIR, x.get('subfolder', ''), x['filename']))
            elapsed = round(time.time() - t0)
            print(f'[{name}] {status_str} in {elapsed}s -> {outs}', flush=True)
            if err:
                print(f'[{name}] ERROR: {err}', flush=True)
            return outs
        time.sleep(2)
    print(f'[{name}] TIMEOUT after {limit}s', flush=True)
    return []

def main():
    print('1. Reserverer GPU på kitor for batch 2 (10 knagger)...', flush=True)
    acq = subprocess.run(
        ['kitor-arbiter', 'acquire', 'image', '--requester', 'filosofradar',
         '--label', 'visuelle-knagger-batch2', '--duration-s', '1800', '--priority', 'normal', '--json'],
        capture_output=True, text=True, check=True
    )
    token = json.loads(acq.stdout)['token']
    print(f'2. Fikk lease-token: {token[:8]}...', flush=True)

    stop_hb = threading.Event()
    def hb():
        while not stop_hb.wait(180):
            try:
                subprocess.run(['kitor-arbiter', 'heartbeat', token], check=True)
            except Exception as e:
                print('Heartbeat feil:', e, flush=True)
    hb_th = threading.Thread(target=hb, daemon=True)
    hb_th.start()

    results = {}
    try:
        w, h = 1280, 768
        for key, prompt in SCENES.items():
            print(f'\n--- Starter generering av {key} ({w}x{h}) ---', flush=True)
            prefix = f'filosofradar/knagger2/{key}'
            g = make_graph(prompt, w, h, seed=42, prefix=prefix)
            outs = run_prompt(key, g)
            results[key] = outs

            # Konverter umiddelbart til WebP
            if outs and os.path.exists(outs[0]):
                im = Image.open(outs[0])
                webp_out = os.path.join(WEBP_DIR, f'{key}.webp')
                im.save(webp_out, 'WEBP', quality=82, method=6)
                kb = os.path.getsize(webp_out) // 1024
                print(f'   -> Lagret WebP: {webp_out} ({kb} KB)', flush=True)
    finally:
        print('\n3. Frigjør kitor-arbiter GPU lease...', flush=True)
        stop_hb.set()
        subprocess.run(['kitor-arbiter', 'release', token])
        print('Lease sluppet!', flush=True)

    print('\nAlle resultater fullført!', flush=True)

if __name__ == '__main__':
    main()
