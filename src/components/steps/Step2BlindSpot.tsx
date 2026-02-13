"use client"

import { useEffect, useState } from 'react'
import ContinueButton from '@/components/ContinueButton'
import BackButton from '@/components/BackButton'

interface Step2Props {
  identity: string | null
  onNext: () => void
  onBack: () => void
}

export default function Step2BlindSpot({ identity, onNext, onBack }: Step2Props) {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 600),
      setTimeout(() => setPhase(2), 1800),
      setTimeout(() => setPhase(3), 3200),
      setTimeout(() => setPhase(4), 4500),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  const identityLine = identity === 'athlete'
    ? 'You train with precision. You recover with protocol.'
    : identity === 'biohacker'
    ? 'You track HRV, sleep stages, readiness scores.'
    : identity === 'fitness'
    ? 'You show up 5 days a week. You take recovery seriously.'
    : 'You move your body. You care about how you feel.'

  return (
    <>
      <BackButton onClick={onBack} />
      <div className="max-w-prose text-center">
        <div className={`transition-all duration-700 ${phase >= 0 ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-text-secondary text-lg mb-8">{identityLine}</p>
        </div>

        <div className={`transition-all duration-700 ${phase >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="text-text-primary text-xl md:text-2xl font-light mb-8">
            But tonight, you&apos;ll lie down on a surface crawling with bacteria.
          </p>
        </div>

        <div className={`transition-all duration-700 ${phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="bg-surface border border-border-color p-6 md:p-8 mb-8">
            <div className="grid grid-cols-3 gap-6 mb-6">
              <div>
                <div className="text-2xl md:text-3xl font-light text-error">1.5B</div>
                <div className="text-xs text-text-muted mt-1">bacteria per sq inch<br/>after 1 week</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-light text-warn">17x</div>
                <div className="text-xs text-text-muted mt-1">dirtier than a<br/>toilet seat</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-light text-accent">8 hrs</div>
                <div className="text-xs text-text-muted mt-1">of skin contact<br/>every night</div>
              </div>
            </div>
            <p className="text-text-muted text-xs">Source: Amerisleep study on bacterial growth in bedding</p>
          </div>
        </div>

        <div className={`transition-all duration-700 ${phase >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="text-text-secondary text-base mb-2">
            Standard cotton and polyester sheets <span className="text-text-primary">trap moisture, heat, and bacteria</span>.
          </p>
          <p className="text-text-secondary text-base mb-8">
            Your recovery environment is working against you.
          </p>
        </div>

        <div className={`transition-all duration-700 ${phase >= 4 ? 'opacity-100' : 'opacity-0'}`}>
          <ContinueButton onClick={onNext} label="What can I do?" />
        </div>
      </div>
    </>
  )
}
