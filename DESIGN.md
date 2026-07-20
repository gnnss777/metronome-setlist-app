# Metrônomo - Design System & UI Specification

## 1. Design Tokens

```css
:root {
  --bg: oklch(0.02 0 0);
  --surface: oklch(0.07 0.003 75);
  --surface-elevated: oklch(0.12 0.005 75);
  --accent: oklch(0.72 0.21 25);
  --accent-glow: oklch(0.72 0.21 25 / 50%);
  --accent-dim: oklch(0.45 0.12 25);
  --text: oklch(0.97 0 0);
  --text-secondary: oklch(0.6 0 0);
  --text-muted: oklch(0.35 0 0);
  --border: oklch(0.15 0 0);
  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 20px;
  --smooth: cubic-bezier(0.19, 1, 0.22, 1);
}
```

## 2. Background Layers

```css
body {
  background: var(--bg);
}

body::before {
  /* Light leaks */
  background:
    radial-gradient(ellipse 80% 50% at 50% 0%, oklch(0.72 0.21 25 / 4%) 0%, transparent 100%),
    radial-gradient(ellipse 80% 50% at 50% 100%, oklch(0.5 0.1 180 / 3%) 0%, transparent 100%);
}

body::after {
  /* Noise texture */
  opacity: 0.025;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}
```

## 3. Typography Scale

| Element | Font | Size | Weight | Other |
|---|---|---|---|---|
| BPM (playing) | JetBrains Mono | 8rem (128px) | 300 | `text-shadow: 0 0 40px var(--accent-glow)` |
| BPM (idle) | JetBrains Mono | 6rem (96px) | 200 | color: `var(--text-muted)` |
| BPM label | Inter | 12px | 400 | uppercase, `tracking: 0.3em`, `color: var(--accent)` |
| Info line | Inter | 14px | 400 | `color: var(--text-secondary)` |
| UI labels | Inter | 12px | 500 | uppercase, `tracking: 0.15em`, `color: var(--text-muted)` |
| Values | JetBrains Mono | 14px | 400 | `color: var(--accent)` |
| Buttons | Inter | 12px | 500 | uppercase, `tracking: 0.1em` |

## 4. Layout (Mobile-First, 375-430px)

```
┌────────────────────────────────┐
│  [⚙]                    [≡]   │  ← Header: position: absolute, top: 20px
│                                │         icons: 44×44px, color: var(--text-muted)
│              ╭────╮           │
│             ╱  120  ╲         │  ← Ring: 280×280px
│            │   BPM   │        │     Dots: 14px, 8 dots
│             ╲       ╱         │     BPM text: centered inside ring
│              ╰────╯           │
│                                │
│         ♩ corda · 500 Hz      │  ← Info: 14px, centered, margin-top: 12px
│                                │
│         ╭──────────╮          │
│         │    ▶     │          │  ← Play: 96×96px, border-radius: 50%
│         ╰──────────╯          │     margin-top: 32px
│                                │     background: oklch(0.6 0.2 145) (play)
│                                │     background: oklch(0.55 0.2 30) (stop)
│  ┌──────────────────────────┐ │
│  │ BPM  ─────●───────── Tap│ │  ← Controls: padding 20px 24px
│  │ SUBD  [♪][♩][♪♪][♪♪♪]   │ │     background: var(--surface)
│  │ PITCH ────●─────  500 Hz│ │     border-radius: var(--radius-md)
│  │ Acento [═══] Vibra [═══] │ │     gap: 20px
│  │ [  Sessão  ] [  Setlist] │ │     all controls: min 48px touch target
│  └──────────────────────────┘ │
└────────────────────────────────┘
```

## 5. Component Sizes

| Component | Size | Touch Target | Notes |
|---|---|---|---|
| Beat ring | 280×280px | - | CSS positioned dots |
| Beat dot | 14px | - | 14px diameter circle |
| Play button | 96px | 96px | `border-radius: 50%` |
| Header button | 44px | 44px | `position: absolute` |
| Slider thumb | 24px | 48px | 24px visible, 48px touch |
| Slider track | 4px | - | `background: var(--border)` |
| Toggle switch | 40×22px | 48×48px | knob: 18px |
| Subdivision chip | 44px | 48px | `min-width: 44px` |
| Section button | 48px | 48px | `border-radius: 8px` |
| Control panel | -20px margin | - | Full width minus 40px |
| Input field | 48px | 48px | `background: var(--bg)` |

## 6. Beat Animations

```css
@keyframes beat-pulse {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.3); opacity: 0.85; }
  100% { transform: scale(1); opacity: 1; }
}

@keyframes glow-pulse {
  0% { box-shadow: 0 0 8px var(--accent-glow), 0 0 20px var(--accent-glow); }
  50% { box-shadow: 0 0 16px var(--accent-glow), 0 0 40px var(--accent-glow), 0 0 60px oklch(0.72 0.21 25 / 15%); }
  100% { box-shadow: 0 0 8px var(--accent-glow), 0 0 20px var(--accent-glow); }
}

@keyframes ring-expand {
  0% { transform: scale(0.85); opacity: 0.5; }
  100% { transform: scale(1.6); opacity: 0; }
}

@keyframes bpm-number-pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.025); }
  100% { transform: scale(1); }
}
```

Duration: `60000 / BPM` ms per beat cycle.

## 7. Beat Ring Implementation

```
Container: 280×280px, position: relative
Dots: 8 dots, evenly spaced in a circle (radius: 120px from center)
Active dot: coral with glow-pulse, beat-pulse, ring-expand
Inactive dots: opacity 0.06-0.2
BPM text: position: absolute, center of ring
```

Dot positions (CSS):
```js
const DOT_COUNT = 8
const RING_SIZE = 280
const DOT_SIZE = 14
const cx = RING_SIZE / 2  // 140
const cy = RING_SIZE / 2  // 140
const r = RING_SIZE / 2 - DOT_SIZE - 6  // 120
// angle = (i * 360 / 8) - 90 degrees
// x = cx + r * cos(radians(angle)) - DOT_SIZE / 2
// y = cy + r * sin(radians(angle)) - DOT_SIZE / 2
```

## 8. Play Button States

### Playing
- Background: `oklch(0.55 0.2 30)` (red)
- Box-shadow: `0 0 40px oklch(0.55 0.2 30 / 40%), 0 8px 32px rgba(0,0,0,0.5)`
- Animation: `glow-pulse 0.6s var(--smooth) infinite`
- Icon: pause (two vertical rects)

### Stopped
- Background: `oklch(0.6 0.2 145)` (green)
- Box-shadow: `0 0 40px oklch(0.6 0.2 145 / 40%), 0 8px 32px rgba(0,0,0,0.5)`
- Animation: none
- Icon: play (triangle)

## 9. Controls Layout

```
┌────────────────────────────┐
│ BPM  ────●───────────  Tap │  ← Row 1: label + slider + button
│ SUBD   [♪][♩][♪♪][♪♪♪]   │  ← Row 2: chips row
│ PITCH ───●───────── 500 Hz │  ← Row 3: label + slider + value
│ Acento [══]  Vibra [═══]   │  ← Row 4: two toggles
│ [  Sessão  ] [  Setlist  ] │  ← Row 5: two buttons
└────────────────────────────┘
```

Each row has `min-height: 48px` for touch targets.
Gap between rows: `20px`.

## 10. Mobile Considerations

- Safe areas: `env(safe-area-inset-top)` and `env(safe-area-inset-bottom)`
- No scroll: `overflow: hidden`, `overscroll-behavior: none`
- Touch: `touch-action: manipulation` on all interactive elements
- Reduced motion: `@media (prefers-reduced-motion: reduce)` disables all animations
- Viewport: `100dvh` (dynamic viewport height)
- Status bar: `theme-color: oklch(0.02 0 0)`, `apple-mobile-web-app-status-bar-style: black-translucent`

## 11. Soundbrenner Reference

- Dark background (#020202)
- One accent color (coral #ff6b6b)
- BPM as the hero element
- Minimal controls, always visible
- Beat visualization synchronized with audio
- Professional studio monitor aesthetic
- No cards, no borders, no glass effects
- Typography as the main visual element
