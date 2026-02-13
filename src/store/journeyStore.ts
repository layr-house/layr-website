"use client"

import { create } from 'zustand'
import type { UserAnswers, FiberBlend, ProductRecommendation } from '@/types/journey'

interface JourneyState {
  currentStep: number
  totalSteps: number
  answers: UserAnswers
  recommendation: ProductRecommendation | null
  setStep: (step: number) => void
  nextStep: () => void
  prevStep: () => void
  setAnswer: (key: keyof UserAnswers, value: string) => void
  getRecommendation: () => ProductRecommendation
}

const BLENDS: Record<string, FiberBlend> = {
  cool: {
    name: 'Arctic Blend',
    tagline: 'Maximum cooling. Zero compromise.',
    primary: 'Bamboo',
    secondary: 'Eucalyptus Lyocell',
    description: 'Engineered for hot sleepers and high-output athletes. Bamboo\'s natural moisture-wicking paired with eucalyptus lyocell\'s evaporative cooling creates a surface that stays dry and cool throughout the night. Your body dumps heat during deep sleep — this blend lets it.',
    properties: { thermoregulation: 95, moisture: 92, antimicrobial: 78, softness: 90, durability: 82 },
    bestFor: ['Hot sleepers', 'High-intensity athletes', 'Night sweats', 'Warm climates'],
    certifications: ['OEKO-TEX Standard 100', 'FSC Certified Bamboo'],
  },
  warm: {
    name: 'Basecamp Blend',
    tagline: 'Warmth without weight. Breathable insulation.',
    primary: 'Hemp',
    secondary: 'Banana Fiber',
    description: 'Built for cold sleepers who need warmth without suffocation. Hemp\'s hollow fiber structure traps air for natural insulation while banana fiber keeps the surface breathable and lightweight. You stay warm. You don\'t overheat. Your body finds equilibrium.',
    properties: { thermoregulation: 88, moisture: 75, antimicrobial: 94, softness: 72, durability: 96 },
    bestFor: ['Cold sleepers', 'Endurance athletes', 'Cool climates', 'Those who layer up'],
    certifications: ['OEKO-TEX Standard 100', 'GOTS Certified'],
  },
  shield: {
    name: 'Shield Blend',
    tagline: 'Your skin\'s defense layer.',
    primary: 'Bamboo',
    secondary: 'Lyocell',
    description: 'Designed for sensitive skin and anyone recovering from skin conditions. Bamboo\'s hypoallergenic properties combined with lyocell\'s nanofibril smoothness — smoother than silk at a microscopic level. Zero chemical finishes. Zero irritants. Your skin contacts nothing that triggers a response.',
    properties: { thermoregulation: 82, moisture: 88, antimicrobial: 85, softness: 98, durability: 80 },
    bestFor: ['Sensitive skin', 'Eczema', 'Post-workout skin recovery', 'Allergy prone'],
    certifications: ['OEKO-TEX Standard 100', 'Dermatologically tested'],
  },
  recovery: {
    name: 'Monk Blend',
    tagline: 'The original performance fiber. Rediscovered.',
    primary: 'Hemp',
    secondary: 'Eucalyptus Lyocell',
    description: 'Our flagship recovery blend. Hemp — used by monks for centuries for its antimicrobial and grounding properties — paired with eucalyptus lyocell for temperature regulation. This is the blend that kills bacteria naturally, regulates your microclimate, and gets stronger with every wash. No tech. No gimmicks. Just material science that\'s been proven for thousands of years.',
    properties: { thermoregulation: 90, moisture: 85, antimicrobial: 98, softness: 78, durability: 95 },
    bestFor: ['Recovery-focused athletes', 'Bacteria-conscious', 'Biohackers', 'Maximum durability'],
    certifications: ['OEKO-TEX Standard 100', 'GOTS Certified', 'EU Hemp Certified'],
  },
  balanced: {
    name: 'Equilibrium Blend',
    tagline: 'Every condition covered. Nothing compromised.',
    primary: 'Hemp',
    secondary: 'Bamboo + Eucalyptus',
    description: 'The all-rounder. Hemp provides the antimicrobial backbone and structural durability. Bamboo adds softness and moisture management. Eucalyptus delivers temperature regulation. Three fibers, each solving a different recovery condition. For athletes who need everything to work, every night.',
    properties: { thermoregulation: 88, moisture: 86, antimicrobial: 90, softness: 85, durability: 88 },
    bestFor: ['Mixed training', 'Variable climate', 'All-around recovery', 'First-time buyers'],
    certifications: ['OEKO-TEX Standard 100', 'GOTS Certified'],
  },
}

function determineBlend(answers: UserAnswers): string {
  const { sleepTemp, skinType, priority } = answers

  // Skin condition overrides
  if (skinType === 'condition' || skinType === 'sensitive') {
    if (priority === 'softness') return 'shield'
    if (sleepTemp === 'hot') return 'cool'
    return 'shield'
  }

  // Temperature-driven
  if (sleepTemp === 'hot') {
    if (priority === 'antimicrobial') return 'recovery'
    return 'cool'
  }

  if (sleepTemp === 'cold') {
    if (priority === 'antimicrobial') return 'recovery'
    return 'warm'
  }

  // Priority-driven for balanced sleepers
  if (priority === 'antimicrobial') return 'recovery'
  if (priority === 'temperature') return 'balanced'
  if (priority === 'moisture') return 'cool'
  if (priority === 'softness') return 'shield'

  return 'balanced'
}

function buildReasoning(answers: UserAnswers, blend: FiberBlend): string {
  const parts: string[] = []

  if (answers.sleepTemp === 'hot') {
    parts.push('You sleep hot — so we prioritized maximum breathability and moisture wicking.')
  } else if (answers.sleepTemp === 'cold') {
    parts.push('You sleep cold — so we selected fibers that insulate without trapping moisture.')
  } else {
    parts.push('Your temperature is balanced — so we matched fibers that adapt to your body\'s needs throughout the night.')
  }

  if (answers.skinType === 'sensitive' || answers.skinType === 'condition') {
    parts.push('With sensitive skin, every fiber contact matters. This blend is hypoallergenic with zero chemical finishes.')
  }

  if (answers.priority === 'antimicrobial') {
    parts.push('You prioritized cleanliness — hemp\'s natural antimicrobial properties kill bacteria without chemicals. Your sheets stay cleaner, longer.')
  } else if (answers.priority === 'moisture') {
    parts.push('Moisture management is critical for your recovery. This blend wicks and evaporates — keeping your sleep surface dry all night.')
  }

  parts.push(`The ${blend.name} is built from ${blend.primary} and ${blend.secondary}. Certified. Tested. Ready to recover on.`)

  return parts.join(' ')
}

export const useJourneyStore = create<JourneyState>((set, get) => ({
  currentStep: 0,
  totalSteps: 9,
  answers: {
    identity: null,
    sleepProblem: null,
    sleepTemp: null,
    skinType: null,
    priority: null,
    activity: null,
  },
  recommendation: null,

  setStep: (step) => set({ currentStep: step }),
  nextStep: () => set((state) => ({ currentStep: Math.min(state.currentStep + 1, state.totalSteps - 1) })),
  prevStep: () => set((state) => ({ currentStep: Math.max(state.currentStep - 1, 0) })),

  setAnswer: (key, value) =>
    set((state) => ({
      answers: { ...state.answers, [key]: value },
    })),

  getRecommendation: () => {
    const { answers } = get()
    const blendKey = determineBlend(answers)
    const blend = BLENDS[blendKey]
    const reasoning = buildReasoning(answers, blend)

    const recommendation: ProductRecommendation = {
      blend,
      reasoning,
      set: {
        fittedSheet: `${blend.name} Fitted Sheet — ${blend.primary} + ${blend.secondary}`,
        duvetCover: `${blend.name} Duvet Cover — ${blend.primary} + ${blend.secondary}`,
        pillowCases: `${blend.name} Pillow Cases (pair) — ${blend.primary} + ${blend.secondary}`,
      },
    }

    set({ recommendation })
    return recommendation
  },
}))
