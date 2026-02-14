"use client"

import type { Lang } from '@/lib/i18n'

interface TopBarProps {
  lang: Lang
  onLangChange: (lang: Lang) => void
  currentStep: number
  totalSteps: number
  onStepClick: (step: number) => void
}

export default function TopBar({ lang, onLangChange, currentStep, totalSteps, onStepClick }: TopBarProps) {
  const progress = Math.round((currentStep / (totalSteps - 1)) * 100)
  
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-bg/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-2xl mx-auto px-6 py-3 flex items-center justify-between">
        <span className="text-sm font-medium tracking-widest text-muted uppercase">Layr</span>
        <div className="flex-1 mx-6">
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-accent rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <button
          onClick={() => onLangChange(lang === 'en' ? 'de' : 'en')}
          className="text-xs font-medium text-muted hover:text-foreground transition-colors uppercase tracking-wider"
        >
          {lang === 'en' ? 'DE' : 'EN'}
        </button>
      </div>
    </div>
  )
}
