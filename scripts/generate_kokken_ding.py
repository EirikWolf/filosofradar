import json, os, subprocess, sys, threading, time, urllib.request
from PIL import Image

U = 'http://localhost:8188'
OUT_DIR = '/mnt/truenas/ai/output/comfyui'
WEBP_DIR = '/home/eirik/filosofradar_webp_batch3'
os.makedirs(WEBP_DIR, exist_ok=True)

SCENES = {
    'zhuangzi-kokken-ding': (
        'Atmospheric fine art painting in Chinese Song Dynasty ink wash and classical chiaroscuro style. '
        'Master Cook Ding (Ding the Cook) in traditional flowing Daoist robes with tied-up sleeves, performing an effortless, graceful '
        'culinary dance with a gleaming kitchen cleaver around a massive ox. The blade glides seamlessly through natural '
        'anatomical gaps with supreme mastery and flow (wu wei), never touching bone or tendon. Warm golden lantern light '
        'piercing through misty kitchen steam, subtle glowing golden trajectory tracing the path of the pristine sharp blade, '
        'serene and sublime philosophical masterpiece, 4k.'
    ),
    'platon-gyges-ring': (
        'Dramatic chiaroscuro oil painting. An ancient shepherd in a dark subterranean chasm holding up a mystical bronze ring '
        'embedded with a glowing stone. As he turns the collet inward towards his palm, his body becomes translucent and ethereal, '
        'fading into invisibility and darkness. Golden torchlight casts eerie dancing shadows on subterranean rock walls, '
        'sublime philosophical masterpiece, 4k.'
    ),
    'descartes-voksstykket': (
        'An intimate 17th-century candlelit philosopher study. A scholar holds a piece of fresh honeycomb beeswax near a flickering '
        'candle flame, watching it lose its sweet flower scent, color, and cold hardness, melting into a warm clear liquid yet remaining '
        'the same wax through pure rational intellect. Warm golden candlelight, rich walnut desk, deep velvety shadows, fine art masterpiece.'
    ),
    'kant-fargede-briller': (
        'Atmospheric 18th-century Enlightenment study room at twilight. A contemplative German philosopher looks through an ornate antique pair '
        'of spectacles held up towards a window looking at the starry cosmos. The lenses refract raw chaotic light into ordered geometric '
        'structures of space, time and causality. Subtle golden geometry and starlight, chiaroscuro oil painting style, masterpiece.'
    ),
    'nietzsche-evig-gjenkomst': (
        'A solitary philosopher standing beside a colossal pyramid-shaped boulder on a windswept alpine mountain path at Lake Silvaplana at twilight. '
        'Above him, the night sky twists into an infinite luminous golden ouroboros spiral of stars and galaxies, symbolizing the eternal return of all moments. '
        'Majestic, dramatic, breathtaking cosmic fine art, 4k.'
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
    print('1. Reserverer GPU på kitor...', flush=True)
    acq = subprocess.run(
        ['kitor-arbiter', 'acquire', 'image', '--requester', 'filosofradar',
         '--label', 'secondary-knagger', '--duration-s', '900', '--priority', 'normal', '--json'],
        capture_output=True, text=True, check=True
    )
    token = json.loads(acq.stdout)['token']
    print(f'2. Fikk lease-token: {token[:8]}...', flush=True)

    stop_hb = threading.Event()
    def hb():
        while not stop_hb.wait(60):
            try:
                subprocess.run(['kitor-arbiter', 'heartbeat', token], check=True)
            except Exception as e:
                print('Heartbeat feil:', e, flush=True)
    hb_th = threading.Thread(target=hb, daemon=True)
    hb_th.start()

    try:
        w, h = 1280, 768
        seed = 101
        for key, prompt in SCENES.items():
            print(f'\n--- Starter generering av {key} ({w}x{h}) ---', flush=True)
            prefix = f'filosofradar/knagger3/{key}'
            g = make_graph(prompt, w, h, seed=seed, prefix=prefix)
            seed += 17
            outs = run_prompt(key, g)

            if outs and os.path.exists(outs[0]):
                im = Image.open(outs[0])
                webp_out = os.path.join(WEBP_DIR, f'{key}.webp')
                im.save(webp_out, 'WEBP', quality=84, method=6)
                kb = os.path.getsize(webp_out) // 1024
                print(f'   -> Lagret WebP: {webp_out} ({kb} KB)', flush=True)
    finally:
        print('\n3. Frigjør kitor-arbiter GPU lease...', flush=True)
        stop_hb.set()
        subprocess.run(['kitor-arbiter', 'release', token])
        print('Lease sluppet!', flush=True)

if __name__ == '__main__':
    main()
