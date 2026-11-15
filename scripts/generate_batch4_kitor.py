import json, os, subprocess, sys, threading, time, urllib.request
from PIL import Image

U = 'http://localhost:8188'
OUT_DIR = '/mnt/truenas/ai/output/comfyui'
WEBP_DIR = '/home/eirik/filosofradar_webp_batch4'
os.makedirs(WEBP_DIR, exist_ok=True)

SCENES = {
    'mahavira-elefanten': (
        'Atmospheric ancient Indian courtyard in warm twilight chiaroscuro. A massive, majestic ceremonial elephant standing quietly. '
        'Around it, several blind sages touch different parts: one feels the sturdy pillar-like leg, another touches the serpentine trunk, '
        'another holds the curved smooth ivory tusk, and another touches the broad ear like a woven fan. '
        'Ethereal golden stardust and sacred temple incense, poetic and profound philosophical fine art masterpiece, 4k.'
    ),
    'buddha-pilen': (
        'Atmospheric ancient grove under a sacred Bodhi tree at dusk. A contemplative monk and healer gently tending to a warrior '
        'struck by a black venomous arrow. Instead of arguing about the caste or bowmaker who shot it, the healer focuses entirely '
        'on removing the arrow and easing the burning pain. Dramatic warm lantern glow against deep jungle shadows, fine art oil painting, '
        'serene and compassionate, 4k.'
    ),
    'diogenes-aleksander': (
        'Dramatic classical Greek oil painting in Rembrandt chiaroscuro. The young, magnificent Emperor Alexander the Great in gleaming '
        'bronze and gold armor with royal purple cloak, surrounded by armored hoplite soldiers, standing before the humble cynic philosopher '
        'Diogenes lounging in his worn clay wine cask in the sun-drenched Athenian marketplace. Diogenes casually gestures to the emperor, '
        'requesting: "Stand out of my sun." Brilliant golden sunlight cutting across deep ancient stone shadows, masterpiece.'
    ),
    'mengzi-bronnen': (
        'Atmospheric ancient Chinese village scene in traditional Song Dynasty ink wash and chiaroscuro. A small toddler crawls unsteadily '
        'towards the open stone rim of a deep well in an ancient stone courtyard. In the background, an onlooker rushes forward with '
        'spontaneous, instinctive panic and compassion to catch the child, before any thought of reward or praise. '
        'Warm lantern light, dramatic tension, sublime emotional fine art, 4k.'
    ),
    'shankara-slangen': (
        'Atmospheric dusty path in an ancient Indian village at deep twilight. A coiled length of coarse rope lies in the dim shadows '
        'beneath a banyan tree. In the twilight gloom, the rope casts a shimmering, phantom-like golden illusion of a rearing hooded cobra. '
        'A passing traveler holds up a flickering oil lamp, the warm light dispelling the fearful illusion and revealing only simple rope. '
        'Mystical chiaroscuro fine art, profound, 4k.'
    ),
    'leibniz-mollen': (
        'Atmospheric 17th-century mechanical interior in deep chiaroscuro. A gigantic, ornate clockwork mill with towering brass cogwheels, '
        'interlocking iron gears and massive wooden levers churning in perpetual motion. A philosopher walks through the vast interior '
        'examining the mechanics, seeking a thought or a conscious sensation, finding only mechanical collisions of parts. '
        'Amber candlelight glinting off polished brass, intricate machinery, philosophical fine art.'
    ),
    'montaigne-katten': (
        'Warm, intimate 16th-century French chateau library filled with leather-bound folios. Michel de Montaigne sitting in a carved '
        'walnut armchair, playfully dangling a ribbon with a graceful calico cat batting at it. A warm golden fireplace glow illuminates '
        'their playful, quizzical eye contact in deep contemplative wonder: who is playing with whom? '
        'Atmospheric oil painting in Dutch Golden Age style, cozy, witty and tender, 4k.'
    ),
    'wonhyo-hodeskallen': (
        'A pitch-black mountain cave shelter in ancient Korea during a torrential thunderstorm. Outside, jagged lightning flashes '
        'illuminate the cave mouth. Inside, a parched wandering monk drinks eagerly from an unseen vessel in the total darkness, '
        'finding it sweet and refreshing. In the faint lightning gleam, the vessel is revealed to be an old human skull filled with '
        'stagnant water. A profound moment of sudden spiritual awakening, dramatic chiaroscuro oil painting, 4k.'
    ),
    'rabia-fakkelen': (
        'Atmospheric night in ancient Basra. The Sufi mystic woman Rabia al-Adawiyya walking through the shadowy cobblestone streets, '
        'carrying a burning blazing golden torch in one hand and a wooden bucket of clear water in the other. Her robes billow in the evening breeze. '
        'A sublime, transcendent expression of divine love: to extinguish the fires of hell and burn down the gates of paradise. '
        'Rich deep lapis lazuli night, warm radiant flame, masterpiece, 4k.'
    ),
    'wittgenstein-and-kanin': (
        'An atmospheric 20th-century scholar study illuminated by a green banker lamp. On a leather-bound desk lies an elegant fine art '
        'ink drawing: a mesmerizing ambiguous profile that seamlessly shifts between a wild duck with open beak and a soft rabbit with long ears. '
        'Nearby lie open notebooks with philosophical formulas and an old fountain pen. Chiaroscuro oil painting style, thoughtful and perceptual, 4k.'
    ),
    'russell-barbereren': (
        'Atmospheric Victorian town barbershop at twilight with vintage mirrors, lather bowls and straight steel razors. A weary village barber '
        'with suspenders and rolled-up sleeves stares intently into an infinity of reflections in opposing mirrors, holding a gleaming '
        'straight razor to his own chin in a state of logical paralysis: can he shave himself if he only shaves those who do not shave themselves? '
        'Dark mahogany, vintage brass, dramatic shadows, masterpiece.'
    ),
    'sokrates-geometrien': (
        'An ancient Athenian sunlit stone colonnade overlooking the Aegean sea. An aged Socrates with bare feet and coarse tunic kneels '
        'on the sandy ground beside a young uneducated slave boy. Socrates draws geometric squares and diagonals in the pale sand with a '
        'wooden stick, gently asking questions as the boy\'s eyes light up with sudden understanding, discovering eternal mathematical '
        'truths from within his own soul. Warm Mediterranean sunlight, marble columns, timeless fine art oil painting, 4k.'
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
    print('1. Reserverer GPU på kitor for batch 4 (12 knagger)...', flush=True)
    acq = subprocess.run(
        ['kitor-arbiter', 'acquire', 'image', '--requester', 'filosofradar',
         '--label', 'knagger-batch4-global', '--duration-s', '1200', '--priority', 'normal', '--json'],
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
        seed = 2024
        for key, prompt in SCENES.items():
            print(f'\n--- Starter generering av {key} ({w}x{h}) ---', flush=True)
            prefix = f'filosofradar/knagger4/{key}'
            g = make_graph(prompt, w, h, seed=seed, prefix=prefix)
            seed += 31
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
