export type SleepProfile = 'hot' | 'cold' | 'balanced'
export type SkinType = 'sensitive' | 'normal' | 'condition'
export type RecoveryPriority = 'temperature' | 'antimicrobial' | 'moisture' | 'softness'
export type ActivityLevel = 'intense' | 'moderate' | 'mixed'

export interface UserAnswers {
  identity: string | null
  sleepProblem: string | null
  sleepTemp: SleepProfile | null
  skinType: SkinType | null
  priority: RecoveryPriority | null
  activity: ActivityLevel | null
}

export interface FiberBlend {
  name: string
  tagline: string
  primary: string
  secondary: string
  description: string
  properties: {
    thermoregulation: number
    moisture: number
    antimicrobial: number
    softness: number
    durability: number
  }
  bestFor: string[]
  certifications: string[]
}

export interface ProductRecommendation {
  blend: FiberBlend
  reasoning: string
  set: {
    fittedSheet: string
    duvetCover: string
    pillowCases: string
  }
}
