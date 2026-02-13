# Layr — Recovery Starts at the Surface

## Interactive Product Journey Website

A full-page, step-by-step interactive experience that educates visitors about natural fiber bedding, collects their sleep/recovery profile, and delivers a personalized fiber blend recommendation.

### Architecture

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **State**: React useState (self-contained, no external store needed)
- **Language**: TypeScript
- **Deployment**: Vercel-ready

### User Journey (9 Steps)

1. **Hero** — Hook: "You optimize everything. Except the surface you recover on."
2. **Identity** — Who are you? (Athlete / Fitness / Active / Biohacker)
3. **Blind Spot** — Bacteria stats reveal (1.5B bacteria, 17x dirtier than toilet)
4. **Temperature** — Hot / Cold / Balanced sleeper
5. **Skin** — Normal / Sensitive / Condition
6. **Science** — Natural fiber education (Hemp, Bamboo, Eucalyptus, Banana)
7. **Priority** — Antimicrobial / Temperature / Moisture / Softness
8. **Processing** — Dramatic loading animation
9. **Result** — Personalized blend recommendation + waitlist capture

### Fiber Blends

| Blend | Primary | Secondary | Best For |
|-------|---------|-----------|----------|
| Arctic | Bamboo | Eucalyptus Lyocell | Hot sleepers |
| Basecamp | Hemp | Banana Fiber | Cold sleepers |
| Shield | Bamboo | Lyocell | Sensitive skin |
| Monk | Hemp | Eucalyptus Lyocell | Recovery / Antimicrobial |
| Equilibrium | Hemp | Bamboo + Eucalyptus | All-around |

### Design System

- **Background**: #0A0A0A (near black)
- **Surface**: #111111
- **Text Primary**: #E8E6E1 (warm white)
- **Text Secondary**: #9B9B9B
- **Accent**: #C4A35A (gold)
- **Font**: Inter (300, 400, 500, 600)
- **Spacing**: Tailwind default scale
- **Components**: OptionCard, ProgressBar, PropertyBar, ContinueButton, BackButton

### Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Deploy

```bash
npx vercel
```

### File Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout + metadata
│   └── page.tsx            # Journey orchestrator
├── components/
│   ├── BackButton.tsx
│   ├── ContinueButton.tsx
│   ├── OptionCard.tsx
│   ├── ProgressBar.tsx
│   ├── PropertyBar.tsx
│   ├── StepWrapper.tsx
│   └── steps/
│       ├── Step0Hero.tsx
│       ├── Step1Identity.tsx
│       ├── Step2BlindSpot.tsx
│       ├── Step3Temperature.tsx
│       ├── Step4Skin.tsx
│       ├── Step5Science.tsx
│       ├── Step6Priority.tsx
│       ├── Step7Processing.tsx
│       └── Step8Result.tsx
├── store/
│   └── journeyStore.ts    # Zustand store (alternative)
├── styles/
│   └── globals.css
└── types/
    └── journey.ts
```
