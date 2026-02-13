"use client"

import OptionCard from '@/components/OptionCard'
import ContinueButton from '@/components/ContinueButton'
import BackButton from '@/components/BackButton'

interface Step1Props {
  value: string | null
  onChange: (val: string) => void
  onNext: () => void
  onBack: () => void
}

const options = [
  { id: 'athlete', title: 'Competitive athlete', desc: 'Training is structured. Recovery is protocol. Performance is measured.', icon: '🏋️' },
  { id: 'fitness', title: 'Serious about fitness', desc: 'Gym 4-6x/week. Track macros. Cold plunge. The works.', icon: '💪' },
  { id: 'active', title: 'Active & health-conscious', desc: 'Running, cycling, yoga. I take care of myself.', icon: '🏃' },
  { id: 'biohacker', title: 'Optimizer / Biohacker', desc: 'Whoop, Oura, supplements, sleep protocols. I measure everything.', icon: '📊' },
]

export default function Step1Identity({ value, onChange, onNext, onBack }: Step1Props) {
  return (
    <>
      <BackButton onClick={onBack} />
      <div className="max-w-lg w-full">
        <span className="label mb-4 block">About You</span>
        <h2 className="text-2xl md:text-3xl font-light mb-2">Which sounds most like you?</h2>
        <p className="text-text-secondary text-sm mb-8">This helps us understand your recovery demands.</p>

        <div className="space-y-3">
          {options.map((opt) => (
            <OptionCard
              key={opt.id}
              title={opt.title}
              description={opt.desc}
              icon={opt.icon}
              selected={value === opt.id}
              onClick={() => onChange(opt.id)}
            />
          ))}
        </div>

        <ContinueButton onClick={onNext} disabled={!value} />
      </div>
    </>
  )
}
