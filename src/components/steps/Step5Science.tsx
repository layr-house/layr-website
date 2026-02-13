"use client"

import { useEffect, useState } from 'react'
import ContinueButton from '@/components/ContinueButton'
import BackButton from '@/components/BackButton'

interface Step5Props {
  onNext: () => void
  onBack: () => void
}

const fibers = [
  { name: 'Hemp', age: '10,000+ years', fact: 'Naturally antimicrobial. Kills bacteria on contact. Gets stronger with every wash. Monks chose it for a reason.', color: '#7A8B6F' },
  { name: 'Bamboo', age: '1,000+ years', fact: 'Moisture-wicking at a molecular level. Breathable. Hypoallergenic. Grows without pesticides or irrigation.', color: '#8BA88B' },
  { name: 'Eucalyptus Lyocell', age: 'Modern science', fact: 'Nanofibril smoothness — smoother than silk under a microscope. Evaporative cooling. Closed-loop production, zero waste.', color: '#6B8E8E' },
  { name: 'Banana Fiber', age: '2,000+ years', fact: 'Lightweight insulation. Naturally lustrous. Breathable warmth without weight. Made from agricultural waste.', color: '#A89B6F' },
]

export default function Step5Science({ onNext, onBack }: Step5Props) {
  const [visibleIndex, setVisibleIndex] = useState(-1)

  useEffect(() => {
    const timers = fibers.map((_, i) =>
      setTimeout(() => setVisibleIndex(i), 600 + i * 800)
    )
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <>
      <BackButton onClick={onBack} />
      <div className="max-w-xl w-full">
        <span className="label mb-4 block">The Science</span>
        <h2 className="text-2xl md:text-3xl font-light mb-2">
          Natural fibers are <span className="text-accent">recovery technology</span>.
        </h2>
        <p className="text-text-secondary text-sm mb-10">
          Before synthetic marketing, there were materials that worked. Not because of branding — because of molecular structure.
        </p>

        <div className="space-y-4">
          {fibers.map((fiber, i) => (
            <div
              key={fiber.name}
              className={`bg-surface border border-border-color p-5 transition-all duration-700 ${
                i <= visibleIndex ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: fiber.color }} />
                <span className="text-sm font-medium text-text-primary">{fiber.name}</span>
                <span className="text-xs text-text-muted ml-auto">{fiber.age}</span>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">{fiber.fact}</p>
            </div>
          ))}
        </div>

        <p className="text-text-muted text-xs mt-8 mb-2">
          All Layr fibers are sourced from certified facilities in India. OEKO-TEX Standard 100. GOTS Certified. No chemical finishes.
        </p>

        <ContinueButton onClick={onNext} label="Find my blend" />
      </div>
    </>
  )
}
