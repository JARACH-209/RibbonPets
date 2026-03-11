# RibbonPets.js

Zero-dependency, drop-in animated pets (cats) for your website. 
~6KB. No build tools. Just vibes.

![Vanilla JS](https://img.shields.io/badge/vanilla-JS-F7DF1E?logo=javascript&logoColor=000)
![Zero Dependencies](https://img.shields.io/badge/dependencies-0-brightgreen)
![Size](https://img.shields.io/badge/size-~6KB-blue)

## What is this?

A self-contained IIFE that spawns animated pixel-art cats on your site's navbar. They walk, sit, sleep, blink, purr, and wag their tails — all pure SVG + CSS animations. No canvas, no sprites, no external assets.

**3 breeds included:**

| Mochi ✨ | Boba | Pixel 🕹️ |
|----------|---------|----------|
| Chibi with sparkly eyes | Chonky with blep tongue | 8-bit retro style |

## Usage

```html
<script src="pet-widget.js"></script>
```

That's it. Hover the 🐱 button (bottom-right) → pick a breed → watch them roam.

## Features

- **Radial breed selector** — hover to pick, click for random
- **3 states per breed** — walk, sit, sleep (with unique SVG for each)
- **Micro-animations** — tail wag, breathing, blinking, whisker twitch, purring, 💤 floats
- **Auto-roaming AI** — cats walk, change direction, rest, and resume on their own
- **Up to 8 cats** — click the button when maxed to clear all
- **Responsive** — adapts to mobile viewports
- **Self-contained** — single IIFE, injects its own styles, no globals leaked

## Customization

| Constant | Default | What it does |
|----------|---------|--------------|
| `NAV_H` | `80` | Your navbar height (px) — cats walk along this line |
| `PET_H` | `36` | Pet sprite height |
| `MAX_PETS` | `8` | Max simultaneous cats |
| `BASE_SPD` | `1.4` | Walk speed (px/frame) |

Color palette uses Tailwind Emerald tokens (`EM`, `EB`, `EL`, `ED`, `EX`) — swap these to re-skin to any color.

## Adding a new breed

Each breed is an object with `name`, `emoji`, `thumb` (24×24 SVG for menu), and three methods: `run(dir)`, `sit(dir)`, `sleep(dir)` — each returning an SVG string. Push it to `BREEDS[]` and you're done.

```js
const myBreed = {
  name: 'Ghost',
  emoji: '👻',
  thumb: `<svg viewBox="0 0 24 24">...</svg>`,
  run(dir)   { return wrap(`...`, [0,0,48,38], dir); },
  sit(dir)   { return wrap(`...`, [0,0,38,40], dir); },
  sleep(dir) { return wrap(`...`, [0,0,38,40], dir); },
};
BREEDS.push(myBreed);
```

## Browser support

All modern browsers. Uses `requestAnimationFrame`, CSS animations, and inline SVG — nothing exotic.

## License

MIT — use it, fork it, put cats on everything.
