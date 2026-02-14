"use client"

import { useState, useCallback } from 'react'
import type { Lang } from '@/lib/i18n'
import type { UserAnswers, FiberBlend, ProductRecommendation } from '@/types/journey'
import TopBar from '@/components/TopBar'
import Step0Hero from '@/components/steps/Step0Hero'
import Step1Identity from '@/components/steps/Step1Identity'
import Step2BlindSpot from '@/components/steps/Step2BlindSpot'
import Step3Temperature from '@/components/steps/Step3Temperature'
import Step4Skin from '@/components/steps/Step4Skin'
import Step5Science from '@/components/steps/Step5Science'
import Step6Priority from '@/components/steps/Step6Priority'
import Step7Processing from '@/components/steps/Step7Processing'
import Step8Result from '@/components/steps/Step8Result'

// ===== BLEND DEFINITIONS =====
const BLENDS: Record<string, FiberBlend> = {
  cool: {
    id: 'cool',
    name: 'Arctic Blend',
    tagline: 'Cooling is everything.',
    primary: 'Eucalyptus Lyocell',
    secondary: 'Bamboo',
    description: 'Engineered for hot sleepers. Eucalyptus lyocell\'s nanofibril structure creates a surface smoother than silk with natural evaporative cooling. Bamboo adds moisture-wicking at a molecular level. The result: a sleep surface that pulls heat away from your body and stays dry all night. No more kicking off covers. No more waking up in a pool of sweat.',
    properties: { thermoregulation: 95, moisture: 92, antimicrobial: 82, softness: 90, durability: 85 },
    bestFor: ['Hot sleepers', 'Night sweats', 'Summer months', 'High metabolism'],
    certifications: ['OEKO-TEX Standard 100', 'FSC Certified Eucalyptus', 'GOTS Certified'],
  },
  warm: {
    id: 'warm',
    name: 'Basecamp Blend',
    tagline: 'Warmth without weight.',
    primary: 'Banana Fiber',
    secondary: 'Hemp',
    description: 'For those who run cold. Banana fiber provides lightweight insulation that traps warmth without bulk. Hemp adds structural integrity and antimicrobial properties. Together, they create a cocoon of warmth that breathes — so you stay warm without overheating. The natural luster of banana fiber adds a subtle sheen that signals quality.',
    properties: { thermoregulation: 88, moisture: 78, antimicrobial: 85, softness: 82, durability: 90 },
    bestFor: ['Cold sleepers', 'Winter months', 'Air-conditioned rooms', 'Those who love weighted blankets'],
    certifications: ['OEKO-TEX Standard 100', 'Fair Trade Certified'],
  },
  shield: {
    id: 'shield',
    name: 'Shield Blend',
    tagline: 'Your skin\'s sanctuary.',
    primary: 'Bamboo',
    secondary: 'Eucalyptus Lyocell',
    description: 'Built for sensitive skin. Bamboo\'s round, smooth fibers create a surface that glides over skin without friction. Zero chemical finishes. Naturally hypoallergenic. Eucalyptus lyocell adds antimicrobial protection without irritation. If you\'ve ever woken up with sheet marks, irritation, or breakouts — this is your solution.',
    properties: { thermoregulation: 85, moisture: 88, antimicrobial: 80, softness: 96, durability: 82 },
    bestFor: ['Sensitive skin', 'Eczema', 'Post-workout skin recovery', 'Allergy prone'],
    certifications: ['OEKO-TEX Standard 100', 'Dermatologically tested'],
  },
  recovery: {
    id: 'recovery',
    name: 'Monk Blend',
    tagline: 'The original performance fiber. Rediscovered.',
    primary: 'Hemp',
    secondary: 'Eucalyptus Lyocell',
    description: 'Our flagship recovery blend. Hemp — used by monks for centuries for its antimicrobial and grounding properties — paired with eucalyptus lyocell for temperature regulation. This is the blend that kills bacteria naturally, regulates your microclimate, and gets stronger with every wash. No tech. No gimmicks. Just material science that\'s been proven for thousands of years.',
    properties: { thermoregulation: 90, moisture: 85, antimicrobial: 98, softness: 78, durability: 95 },
    bestFor: ['Athletes', 'Heavy trainers', 'Acne-prone skin', 'Those who value longevity'],
    certifications: ['OEKO-TEX Standard 100', 'GOTS Certified', 'EU Hemp Certified'],
  },
  balanced: {
    id: 'balanced',
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

// ===== BLEND DETERMINATION LOGIC =====
function determineBlend(answers: UserAnswers): string {
  const { sleepTemp, skinType, priorities } = answers
  
  // Skin condition overrides
  if (skinType === 'condition' || skinType === 'sensitive') {
    if (priorities.includes('softness')) return 'shield'
    if (sleepTemp === 'hot') return 'cool'
    return 'shield'
  }
  
  // Temperature-driven
  if (sleepTemp === 'hot') {
    if (priorities.includes('antimicrobial')) return 'recovery'
    return 'cool'
  }
  
  if (sleepTemp === 'cold') {
    if (priorities.includes('antimicrobial')) return 'recovery'
    return 'warm'
  }
  
  // Priority-driven for balanced sleepers
  if (priorities.includes('antimicrobial')) return 'recovery'
  if (priorities.includes('temperature')) return 'balanced'
  if (priorities.includes('moisture')) return 'cool'
  if (priorities.includes('softness')) return 'shield'
  
  return 'balanced'
}

function buildReasoning(answers: UserAnswers, blend: FiberBlend, lang: Lang): string {
  const parts: string[] = []
  
  if (lang === 'de') {
    if (answers.sleepTemp === 'hot') {
      parts.push('Du schläfst heiß — wir haben maximale Atmungsaktivität und Feuchtigkeitsableitung priorisiert.')
    } else if (answers.sleepTemp === 'cold') {
      parts.push('Du schläfst kalt — wir haben Fasern gewählt, die isolieren ohne Feuchtigkeit einzuschließen.')
    } else {
      parts.push('Deine Temperatur ist ausgeglichen — wir haben Fasern gewählt, die sich die ganze Nacht an deinen Körper anpassen.')
    }
    
    if (answers.skinType === 'sensitive' || answers.skinType === 'condition') {
      parts.push('Bei empfindlicher Haut zählt jeder Faserkontakt. Diese Mischung ist hypoallergen ohne chemische Ausrüstungen.')
    }
    
    if (answers.priorities.includes('antimicrobial')) {
      parts.push('Du hast Sauberkeit priorisiert — die natürlichen antimikrobiellen Eigenschaften von Hanf töten Bakterien ohne Chemikalien.')
    }
    if (answers.priorities.includes('moisture')) {
      parts.push('Feuchtigkeitsmanagement ist entscheidend für deine Erholung. Diese Mischung leitet ab und verdunstet — hält deine Schlafoberfläche die ganze Nacht trocken.')
    }
  } else {
    if (answers.sleepTemp === 'hot') {
      parts.push('You sleep hot — we prioritized maximum breathability and moisture wicking.')
    } else if (answers.sleepTemp === 'cold') {
      parts.push('You sleep cold — we selected fibers that insulate without trapping moisture.')
    } else {
      parts.push('Your temperature is balanced — we matched fibers that adapt to your body\'s needs throughout the night.')
    }
    
    if (answers.skinType === 'sensitive' || answers.skinType === 'condition') {
      parts.push('With sensitive skin, every fiber contact matters. This blend is hypoallergenic with zero chemical finishes.')
    }
    
    if (answers.priorities.includes('antimicrobial')) {
      parts.push('You prioritized cleanliness — hemp\'s natural antimicrobial properties kill bacteria without chemicals. Your sheets stay cleaner, longer.')
    }
    if (answers.priorities.includes('moisture')) {
      parts.push('Moisture management is critical for your recovery. This blend wicks and evaporates — keeping your sleep surface dry all night.')
    }
  }
  
  return parts.join(' ')
}

// ===== MAIN COMPONENT =====
export default function Home() {
  const [lang, setLang] = useState<Lang>('en')
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<UserAnswers>({
    identity: null,
    sleepTemp: null,
    skinType: null,
    priorities: [],
  })
  const [recommendation, setRecommendation] = useState<ProductRecommendation | null>(null)
  
  const totalSteps = 9 // 0-8
  const questionSteps = 7 // Steps 1-6 are questions, 0 is hero, 7 is processing, 8 is result
  
  const next = useCallback(() => setStep(s => Math.min(s + 1, totalSteps - 1)), [])
  const back = useCallback(() => setStep(s => Math.max(s - 1, 0)), [])
  const goTo = useCallback((s: number) => {
    if (s < step) setStep(s)
  }, [step])
  
  const setAnswer = useCallback((key: keyof UserAnswers, value: string | string[]) => {
    setAnswers(prev => ({ ...prev, [key]: value }))
  }, [])
  
  const generateRecommendation = useCallback(() => {
    const blendKey = determineBlend(answers)
    const blend = BLENDS[blendKey]
    const reasoning = buildReasoning(answers, blend, lang)
    setRecommendation({
      blend,
      reasoning,
      set: {
        fittedSheet: `${blend.name} Fitted Sheet`,
        duvetCover: `${blend.name} Duvet Cover`,
        pillowCases: `${blend.name} Pillow Cases (pair)`,
      },
    })
    next()
  }, [answers, lang, next])
  
  const restart = useCallback(() => {
    setStep(0)
    setAnswers({ identity: null, sleepTemp: null, skinType: null, priorities: [] })
    setRecommendation(null)
  }, [])
  
  // Show TopBar for steps 1-7 (not hero, not result)
  const showTopBar = step >= 1 && step <= 7
  
  return (
    <main className="min-h-screen bg-bg">
      {showTopBar && (
        <TopBar
          lang={lang}
          onLangChange={setLang}
          currentStep={step}
          totalSteps={questionSteps}
          onStepClick={goTo}
        />
      )}
      
      {step === 0 && <Step0Hero lang={lang} onLangChange={setLang} onStart={next} />}
      
      {step === 1 && (
        <Step1Identity
          lang={lang}
          value={answers.identity}
          onChange={(v) => { setAnswer('identity', v); setTimeout(next, 300) }}
          onBack={back}
        />
      )}
      
      {step === 2 && (
        <Step2BlindSpot
          lang={lang}
          identity={answers.identity}
          onNext={next}
          onBack={back}
        />
      )}
      
      {step === 3 && (
        <Step3Temperature
          lang={lang}
          value={answers.sleepTemp}
          onChange={(v) => { setAnswer('sleepTemp', v); setTimeout(next, 300) }}
          onBack={back}
        />
      )}
      
      {step === 4 && (
        <Step4Skin
          lang={lang}
          value={answers.skinType}
          onChange={(v) => { setAnswer('skinType', v); setTimeout(next, 300) }}
          onBack={back}
        />
      )}
      
      {step === 5 && (
        <Step5Science
          lang={lang}
          onNext={next}
          onBack={back}
        />
      )}
      
      {step === 6 && (
        <Step6Priority
          lang={lang}
          values={answers.priorities}
          onChange={(v) => setAnswer('priorities', v)}
          onNext={generateRecommendation}
          onBack={back}
        />
      )}
      
      {step === 7 && (
        <Step7Processing
          lang={lang}
          onComplete={next}
        />
      )}
      
      {step === 8 && recommendation && (
        <Step8Result
          lang={lang}
          recommendation={recommendation}
          onRestart={restart}
        />
      )}
    </main>
  )
}
