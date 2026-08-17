---
name: cli-ck
description: Terminal-first AI-native dev workspace — marketing/docs site
colors:
  signal-deep: "#047857"
  signal: "#10b981"
  signal-bright: "#6ee7b7"
  ink: "oklch(0.218 0.008 223.9)"
  ink-inverted: "oklch(0.925 0.005 214.3)"
  surface: "oklch(1 0 0)"
  surface-dark: "oklch(0.155 0.028 162.0)"
  surface-card-dark: "oklch(0.205 0.030 162.0)"
  foreground: "oklch(0.148 0.004 228.8)"
  foreground-dark: "oklch(0.987 0.002 197.1)"
  muted-foreground: "oklch(0.56 0.021 213.5)"
  muted-foreground-dark: "oklch(0.723 0.014 214.4)"
  border: "oklch(0.925 0.005 214.3)"
  border-dark: "oklch(1 0 0 / 10%)"
  field: "oklch(0.925 0.005 214.3)"
  field-dark: "oklch(1 0 0 / 15%)"
  destructive: "oklch(0.577 0.245 27.325)"
  destructive-dark: "oklch(0.704 0.191 22.216)"
typography:
  display:
    fontFamily: "Inter, ui-sans-serif, system-ui"
    fontSize: "clamp(2.25rem, 5vw, 4.5rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Inter, ui-sans-serif, system-ui"
    fontSize: "clamp(1.875rem, 3vw, 3rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Inter, ui-sans-serif, system-ui"
    fontSize: "clamp(1.875rem, 2.5vw, 2.6rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.6875rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.18em"
rounded:
  sm: "6px"
  md: "8px"
  lg: "10px"
  xl: "14px"
  2xl: "18px"
  3xl: "22px"
  4xl: "26px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
    rounded: "{rounded.4xl}"
    padding: "0 12px"
    height: "36px"
  button-primary-hover:
    backgroundColor: "oklch(0.218 0.008 223.9 / 0.8)"
  button-outline:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.4xl}"
    padding: "0 12px"
    height: "36px"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.4xl}"
    padding: "24px"
  badge:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
    rounded: "{rounded.3xl}"
    padding: "2px 8px"
    height: "20px"
  input:
    backgroundColor: "{colors.field}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.3xl}"
    height: "36px"
---

# Design System: cli-ck

## Overview

**Creative North Star: "The Quiet Terminal"**

cli-ck's site is a restrained, monochrome workspace with exactly one glowing signal color — like a terminal prompt in a dark room. Every surface, button, and card is disciplined grayscale ink; discipline is what makes the one accent (emerald, matching the product's own logo mark) read as meaningful rather than decorative. The product's positioning — a ~7 MB, ~300 ms binary that does more with less than its Electron-based competitors — is expressed visually the same way: nothing is spent on ornament that isn't earned.

The site reads precise, restrained, and quietly confident. Confidence here means omission, not volume: exact numbers in monospace (7 MB, 300 ms, Apache-2.0) instead of marketing superlatives, generous whitespace instead of dense feature-wall layouts, and a single real-time WebGL shader instead of a library of decorative gradients. The one confirmed anti-reference is the generic SaaS gradient-mesh landing page — purple/blue blob gradients, stock-photo heroes, bento-grid-of-everything layouts. The animated background is the site's only "mesh gradient," and it earns the exception by being real, physically simulated, and tied directly to the brand mark rather than a stock effect.

**Key Characteristics:**
- Monochrome UI chrome (ink-on-surface, inverted per theme) with zero colored buttons, links-as-color, or tinted borders.
- One signal hue (emerald, three intensities) confined to the ambient shader background and the dark-mode surface tint.
- Every major section opens with a mono index + eyebrow label before its heading — a recurring wayfinding device.
- Heavy, consistent corner rounding (18–26px) across buttons, cards, and badges — soft and tactile despite the technical subject matter.
- Flat UI at rest; depth is reserved for framed product media (screenshots, embedded video), never for ordinary chrome.

## Colors

The palette is almost entirely grayscale ink; color exists as a single restrained signal, not a system of hues.

### Primary
- **Deep Signal** (`#047857`): the shader's darkest stop — used only inside the animated background gradient, never as a flat fill.
- **Signal** (`#10b981`): the mid stop and the product's actual logo/mark color — the closest thing to a "brand color," still confined to the shader and the dark-mode surface tint.
- **Signal Bright** (`#6ee7b7`): the shader's lightest stop, used for highlight motion within the animation only.

### Neutral
- **Ink** (`oklch(0.218 0.008 223.9)` light / `oklch(0.925 0.005 214.3)` dark, inverted): primary button fill, primary text-on-light emphasis. Inverts per theme rather than staying a fixed hex — the UI has no "brand blue," only foreground-vs-background contrast.
- **Surface** (`oklch(1 0 0)` light / `oklch(0.155 0.028 162.0)` dark): page background. In dark mode this is not neutral gray — it carries a faint emerald tint (`0.028` chroma toward the signal hue at 162° hue angle), the only place besides the shader where the brand color leaks into a flat fill.
- **Surface Card** (dark: `oklch(0.205 0.030 162.0)`): dark-mode card/popover fill, one step lighter than surface, same emerald-tinted hue family. In light mode, card equals surface (pure white).
- **Foreground** (`oklch(0.148 0.004 228.8)` light / `oklch(0.987 0.002 197.1)` dark): body text.
- **Muted Foreground** (`oklch(0.56 0.021 213.5)` light / `oklch(0.723 0.014 214.4)` dark): secondary text, eyebrows, captions, stat labels.
- **Border** (`oklch(0.925 0.005 214.3)` light / `oklch(1 0 0 / 10%)` dark): hairline dividers — always thin, always at reduced opacity, never a solid heavy rule.
- **Field** (`oklch(0.925 0.005 214.3)` light / `oklch(1 0 0 / 15%)` dark): input backgrounds, used at 50% additional opacity (`bg-field/50`) so form fields sit barely above the page surface.
- **Destructive** (`oklch(0.577 0.245 27.325)` light / `oklch(0.704 0.191 22.216)` dark): the one confirmed non-grayscale UI color, reserved strictly for error/invalid states.

### Named Rules
**The Atmosphere-Only Rule.** Signal green never appears in UI chrome — no colored buttons, links, icons, borders, or badges. Its only two homes are the ambient shader background and the dark-mode surface tint. It is a mood, not a UI color; the moment it starts filling a button, the system has been broken.

## Typography

**Display/Body Font:** Inter (with `ui-sans-serif, system-ui` fallback)
**Label/Mono Font:** Geist Mono (with `ui-monospace, monospace` fallback)

**Character:** Inter carries nearly the entire system — display, headline, title, and body all share one grotesque-sans voice, differentiated only by size, weight, and tracking. Geist Mono is reserved for anything that reads as data or metadata: eyebrows, index numbers, stat values, version strings, terminal captions. The pairing itself is the "precise, restrained" mood made literal: one humanist voice for reading, one mechanical voice for facts.

### Hierarchy
- **Display** (600, `clamp(2.25rem, 5vw, 4.5rem)`, line-height 1.05, tracking `-0.04em`): the hero H1 only. Tight tracking at large size keeps it dense rather than airy.
- **Headline** (600, `clamp(1.875rem, 3vw, 3rem)`, line-height 1.1, tracking `-0.02em`): section H2s (`SectionHeading`).
- **Title** (600, `clamp(1.875rem, 2.5vw, 2.6rem)`, line-height 1.05, tracking `-0.03em`): feature-block H3s inside two-column showcases.
- **Body** (400, 1rem–1.0625rem, relaxed line-height): paragraph copy, always set in `muted-foreground`, not full-contrast foreground — body text is deliberately quieter than headings.
- **Label** (500, 0.6875rem–0.75rem, tracking `0.18em`–`0.2em`, uppercase, mono): eyebrows, section index numbers, stat labels, terminal-frame captions.

### Named Rules
**The Numbered Eyebrow Rule.** Every major landing-page section opens with a mono index number (`00`, `01`, `02`…), a short hairline rule, and an uppercase eyebrow label, set immediately before the section heading. It's a recurring wayfinding device across the page, not a one-off decoration on any single section.

## Layout

Containers cap at `max-w-6xl` for most sections, `max-w-7xl` for the two-column feature showcases (12-column grid, image on one side, copy on the other, order-flippable), and `max-w-3xl` for narrow reading contexts (FAQ, About prose). Section vertical rhythm is generous and escalates with content weight: `py-20`/`py-28` for standard content sections, up to `py-24`–`py-40` for feature showcases with large media. Horizontal page padding is `px-4` on mobile, `px-6` from `sm:` up — content never touches the viewport edge.

The hero is centered and text-first; feature showcases below it alternate to a side-by-side, alternating-order layout (`reverse` prop flips media/copy order) so the page has rhythm rather than repeating the same block shape section after section.

## Elevation & Depth

The system deliberately splits elevation into two regimes rather than one continuous scale.

**Flat by default.** Ordinary UI chrome — buttons, badges, inputs, accordions, stat tiles — sits at `shadow-md` at most, usually paired with only a 5% ring (`ring-foreground/5`) or a hairline border. Nothing in the interactive chrome uses a large diffuse shadow.

**Floating media only.** Anything that frames real product output — screenshots (`AppScreenshotFrame`) and the embedded demo video (`ProductDemo`) — gets a large, soft floating shadow (`0 30-40px 80-100px -20px rgba(0,0,0,0.55-0.6)`) plus a blurred radial halo behind it. This is the one place the system spends real depth budget.

The FAQ accordion is the one glassmorphic exception (`bg-white/60` light / `bg-white/[0.04]` dark, `backdrop-blur-xl`, inset top highlight) — used sparingly, not as a general card treatment.

### Shadow Vocabulary
- **Media Float** (`0 30px 80px -20px rgba(0,0,0,0.55)` mid, `0 40px 100px -20px rgba(0,0,0,0.6)` for the demo video): the halo behind any framed screenshot or video.
- **Card Ambient** (`shadow-md` + `ring-1 ring-foreground/5`, `ring-foreground/10` dark): the ceiling for ordinary card elevation.

### Named Rules
**The Flat Chrome, Floating Media Rule.** Ordinary UI stays flat or near-flat. Heavy shadow and blur are reserved for framed product screenshots and video, so depth signals "this is a window into the real app," not generic decoration. If a new component isn't literally framing a screenshot or video, it doesn't get a floating shadow.

## Shapes

Corners are heavily and consistently rounded: buttons and cards at `26px` (`rounded-4xl`), badges and inputs at `22px` (`rounded-3xl`), accordions and glass panels at `18px` (`rounded-2xl`). This is a deliberate softness that runs against the "developer tool" instinct toward sharp, mechanical edges — the product is precise, but the interface is tactile and approachable. Borders throughout are 1px hairlines, almost always at reduced opacity (`border-border/60`, `border-white/10`) rather than full-opacity rules. The terminal-chrome frame (screenshots, video) is the one place corners pull back slightly, to `18px` (`rounded-2xl`), reinforcing that it's a distinct "framed window" object rather than an ordinary card.

## Components

Buttons, cards, and inputs should feel **tactile and quiet**: heavily rounded and softly interactive (a 1px press-down translate, a subtle opacity shift on hover), but color and shadow stay almost entirely absent from chrome. Nothing in the component set is loud.

### Buttons
- **Shape:** fully pill-like at default height (`rounded-4xl`, 26px radius against a 36px-tall control).
- **Primary:** ink background, inverted-ink text, no border — the default CTA. `hover:bg-primary/80` (80% opacity, not a hue shift).
- **Outline / Secondary / Ghost:** transparent or near-transparent fills with a hairline border or muted hover background; never colored.
- **Press feedback:** `active:translate-y-px` — a 1px physical press, not a scale or color change.

### Badges
- **Shape:** `rounded-3xl` (22px) at a 20px height — effectively a pill.
- **Style:** same ink/surface inversion as primary buttons; variants (secondary, outline, destructive, ghost) swap fill/border only, never introduce a new hue outside destructive red.

### Cards / Containers
- **Corner Style:** `rounded-4xl` (26px).
- **Background:** surface (equals page background in light mode; one step lighter, emerald-tinted, in dark mode).
- **Shadow Strategy:** Card Ambient only (see Elevation & Depth) — never Media Float.
- **Border:** none by default; a 5–10% foreground ring substitutes for a hard border.
- **Internal Padding:** 24px (`py-6 px-6`), reduced to 16px in the `sm` card size variant.

### Inputs / Fields
- **Style:** `rounded-3xl` (22px), `field` background at 50% opacity, no visible border at rest.
- **Focus:** border shifts to the ring color plus a 3px soft ring (`focus-visible:ring-3 ring-ring/30`) — the one moment a field gets a visible edge.
- **Error / Disabled:** destructive border + ring on invalid; 50% opacity and no pointer events when disabled.

### Navigation
- Header/footer keep the same monochrome-ink, hairline-border language as the rest of the chrome; no distinct nav-specific color or elevation treatment observed.

### Terminal Chrome Frame (signature)
The recurring "window" component wrapping any real product view — screenshots and the embedded demo video. Dark `zinc-950` shell regardless of site theme (light or dark mode), a hairline top bar with three **muted zinc dots** (`bg-zinc-700/90`, never red/yellow/green traffic-light colors), and an optional mono caption (`cli-ck · demo`) in `zinc-500`. Always paired with Media Float elevation and a soft background halo. This is the system's most distinctive custom component — it's how the site signals "this is the real app," not a mockup.

### Seam Grid (signature)
The tile-grid technique used for the toolkit feature grid and the product stat row: the grid container's own background is set to the border color, cells are set to the page background, and a 1px `gap` between cells does the work a per-tile border or shadow would otherwise do. Produces perfectly even hairline seams between tiles without stacking individual borders.

## Do's and Don'ts

### Do:
- **Do** keep buttons, cards, and badges heavily pill-rounded (26px / 22px radius) and monochrome ink — no colored chrome.
- **Do** reserve the signal-green family (Deep Signal / Signal / Signal Bright) for the shader background and the dark-mode surface tint only.
- **Do** open every major landing-page section with the mono index + eyebrow pattern (`00`, `01`, `02`…) for wayfinding consistency.
- **Do** use the Seam Grid technique (border-as-background + `gap-px`) for any repeating tile grid instead of stacking individual card shadows.
- **Do** frame any product screenshot or embedded video in the Terminal Chrome component (muted zinc dots, mono caption, dark `zinc-950` shell) regardless of site theme.
- **Do** keep copy terse with exact numbers (7 MB, 300 ms, Apache-2.0) rather than vague superlatives — this is a visual/voice invariant, not just a copy note.

### Don't:
- **Don't** introduce a second accent hue. One signal color, at three fixed intensities, is the palette's only departure from grayscale.
- **Don't** add gradient-mesh hero backgrounds, stock photography, or bento-grid-of-everything layouts — the WebGL shader is the one earned exception, and it's earned by being real and brand-tied, not decorative.
- **Don't** add heavy shadows or thick borders to ordinary UI chrome (buttons, inputs, badges, stat tiles) — depth is reserved for framed media per the Flat Chrome, Floating Media Rule.
- **Don't** sharpen buttons or cards toward smaller corner radii — the heavy rounding is a deliberate "tactile and quiet" choice, not an unstyled default.
- **Don't** use colored (red/yellow/green) traffic-light dots on Terminal Chrome frames — muted zinc only, to avoid reading as a generic macOS window mockup.
