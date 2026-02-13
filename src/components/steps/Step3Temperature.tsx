"use client"

import OptionCard from '@/components/OptionCard'
import ContinueButton from '@/components/ContinueButton'
import BackButton from '@/components/BackButton'

interface Step3Props {
  value: string | null
  onChange: (val: string) => void
  onNext: () => void
  onBack: () => void
}

const options = [
  { id: 'hot', title: 'I sleep hot', desc: 'I kick off covers. I wake up sweating. Cooling is everything.', icon: '🔥' },
  { id: 'cold', title: 'I sleep cold', desc: 'I pile on blankets. My feet are always cold. I need warmth.', icon: '❄️' },
  { id: 'balanced', title: 'It depends on the night', desc: 'Some nights hot, some cold. I need something adaptive.', icon: '⚖️' },
]

export default function Step3Temperature({ value, onChange, onNext, onBack }: Step3Props) {
  return (
    <>
      <BackButton onClick={onBack} />
      <div className="max-w-lg w-full">
        <span className="label mb-4 block">Your Sleep Environment</span>
        <h2 className="text-2xl md:text-3xl font-light mb-2">How does your body sleep?</h2>
        <p className="text-text-secondary text-sm mb-8">Temperature regulation is the #1 factor in sleep quality. Your fiber blend needs to match.</p>

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
