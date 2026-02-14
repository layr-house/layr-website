export type UserAnswers = {
  identity: string | null
  sleepTemp: string | null
  skinType: string | null
  priorities: string[]
}

export type FiberBlend = {
  id: string
  name: string
  tagline: string
  primary: string
  secondary: string
  description: string
  properties: Record<string, number>
  bestFor: string[]
  certifications?: string[]
}

export type ProductRecommendation = {
  blend: FiberBlend
  reasoning: string
  set: {
    fittedSheet: string
    duvetCover: string
    pillowCases: string
  }
}
