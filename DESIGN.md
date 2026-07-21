# Metrônomo - Design System & UI Specification

Inspired by Linear (dark-mode-native) and Vercel (shadow-as-border).

## 1. Design Tokens

```css
:root {
  --bg: oklch(0.02 0 0);            /* #020202 - near-black canvas */
  --surface: oklch(0.07 0.003 75);   /* #0f1011 - Linear panel */
  --surface-elevated: oklch(0.12 0 0); /* #1a1a1a - elevated */
  --accent: oklch(0.72 0.21 25);     /* #ff6b6b - coral, single accent */
  --accent-glow: oklch(0.72 0.21 25 / 50%);
  --accent-dim: oklch(0.45 0.12 25);
  --text: oklch(0.97 0 0);           /* #f7f8f8 - near-white */
  --text-secondary: oklch(0.65 0 0); /* #a0a0a0 */
  --text-muted: oklch(0.45 0 0);     /* #666 - Linear quaternary */
  --border-subtle: oklch(1 0 0 / 0.05); /* rgba(255,255,255,0.05) */
  --border: oklch(1 0 0 / 0.08);    /* rgba(255,255,255,0.08) */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --smooth: cubic-bezier(0.19, 1, 0.22, 1);
  --beat-dur: 0.25s;
}
```

## 2. Background (Linear-style)

Pure dark canvas with imperceptible gradient wash. No glass, no noise texture.

```css
body {
  background: #020202;
}
```

## 3. Typography (Linear-inspired)

| Element | Font | Size | Weight | Other |
|---|---|---|---|---|
| BPM (playing) | Inter | clamp(4.5rem, 28vw, 11rem) | 510 | `text-shadow: 0 0 60px var(--accent-glow)` |
| BPM (idle) | Inter | clamp(3rem, 18vw, 7rem) | 300 | color: `var(--text-muted)` |
| BPM label | Inter | 13px | 600 | uppercase, tracking 0.35em |
| Info line | Inter | 14px | 400 | color: `var(--text-secondary)` |
| UI labels | Inter | 13px | 500 | uppercase, tracking 0.15em |
| Values | JetBrains Mono | 14px | 400 | color: `var(--accent)` |

## 4. Layout (Mobile-First)

```
┌────────────────────────────────┐
│ [⚙]                    [≡]    │  ← Header: position absolute, icons 44px
│                                │
│          ╭──────────╮         │
│         ╱   120.0   ╲        │  ← Ring: 75vw, centered
│        │     BPM     │        │     Border: 1px solid var(--border-subtle)
│         ╲           ╱        │
│          ╰──────────╯         │
│        ♩ corda · 500 Hz      │
│                                │
│         ╭──────────╮          │
│         │    ▶     │          │  ← Play: 96px, green/red
│         ╰──────────╯          │
│                                │
│   [Tap] [−] [+] [...]         │
│   ┌──────────────────────┐    │
│   │ BPM ─────●───────    │    │  ← Controls (expanded)
│   │ SUBD [♪][♩][♪♪]     │    │
│   │ PITCH ────●─── 500Hz │    │
│   │ Acento [══] Vibra    │    │
│   └──────────────────────┘    │
│                                │
│  ╭─────────────────────────╮  │
│  │ ◉ Metr  ≡ Set  ♪ Af    │  │  ← Glass tab bar
│  ╰─────────────────────────╯  │
└────────────────────────────────┘
```

## 5. Component Sizes

| Component | Size | Notes |
|---|---|---|
| Beat ring | 75vw (280-380px) | 8 dots, 14px each |
| Dots | 14px | Active: coral + glow + beat-pulse |
| BPM | 28vw (105-240px) | Inter 510, tabular-nums |
| Play button | 96px | `border-radius: 50%` |
| Header buttons | 44px | `position: absolute` |
| Controls panel | full width - 40px | Shadow-as-border, NOT glass |
| Slider thumb | 32px | 48px hit area |
| Slider track | 6px | `background: var(--border)` |
| Toggle switch | 44x24px | knob 20px |
| Subdivision chips | 48px | `border-radius: 8px` |
| Section buttons | 48px | `border-radius: 8px` |

## 6. Shadow-as-Border (Vercel technique)

```css
/* Instead of border: 1px solid ... */
.panel {
  box-shadow: 0px 0px 0px 1px rgba(255,255,255,0.05);
}

/* Card with depth */
.card {
  box-shadow:
    0px 0px 0px 1px rgba(255,255,255,0.05),
    0px 2px 4px rgba(0,0,0,0.2);
}
```

## 7. Beat Animations

```css
@keyframes beat-pulse {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.35); opacity: 0.85; }
  100% { transform: scale(1); opacity: 1; }
}
@keyframes glow-pulse {
  0% { box-shadow: 0 0 8px var(--accent-glow), 0 0 24px var(--accent-glow); }
  50% { box-shadow: 0 0 20px var(--accent-glow), 0 0 48px var(--accent-glow), 0 0 72px oklch(0.72 0.21 25 / 15%); }
  100% { box-shadow: 0 0 8px var(--accent-glow), 0 0 24px var(--accent-glow); }
}
@keyframes ring-expand {
  0% { transform: scale(0.85); opacity: 0.5; }
  100% { transform: scale(1.8); opacity: 0; }
}
@keyframes bpm-number-pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.03); }
  100% { transform: scale(1); }
}
```

Duration: `60000 / BPM` ms per beat cycle.

## 8. Key Design Principles (from Linear)

1. **Dark-mode-native**: The app is designed for darkness first. Not a light app with a dark skin.
2. **Single accent color**: Coral (#ff6b6b) is the ONLY chromatic color. Everything else is black/white/gray.
3. **Borders are shadows**: Use `box-shadow: 0px 0px 0px 1px rgba(255,255,255,0.05)` instead of CSS borders.
4. **Every element earns its place**: No decoration, no glass effects, no noise texture. Only functional elements.
5. **Typography is the UI**: The BPM number IS the interface. Controls are secondary.
6. **Minimal color variation**: Use opacity percentages of white (6%, 8%, 12%, 20%, 60%, 97%) instead of multiple gray values.

## 9. Mobile Considerations

- Safe areas: `env(safe-area-inset-*)`
- No scroll: `overflow: hidden`, `overscroll-behavior: none`
- Touch: `touch-action: manipulation` on all interactive elements
- Reduced motion: `@media (prefers-reduced-motion: reduce)` disables all animations
- Viewport: `100dvh` (dynamic viewport height)
- All touch targets: minimum 44px (48px preferred)
