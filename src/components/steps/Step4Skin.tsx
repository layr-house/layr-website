"use client"

import OptionCard from '@/components/OptionCard'
import ContinueButton from '@/components/ContinueButton'
import BackButton from '@/components/BackButton'

interface Step4Props {
  value: string | null
  onChange: (val: string) => void
  onNext: () => void
  onBack: () => void
}

const options = [
  { id: 'normal', title: 'Normal skin', desc: 'No particular issues. I just want the best surface for recovery.', icon: '✓' },
  { id: 'sensitive', title: 'Sensitive skin', desc: 'I react to certain fabrics, detergents, or materials easily.', icon: '⚡' },
  { id: 'condition', title: 'Skin condition', desc: 'Eczema, psoriasis, acne, or other conditions I manage actively.', icon: '🛡️' },
]

export default function Step4Skin({ value, onChange, onNext, onBack }: Step4Props) {
  return (
    <>
      <BackButton onClick={onBack} />
      <div className="max-w-lg w-full">
        <span className="label mb-4 block">Your Skin</span>
        <h2 className="text-2xl md:text-3xl font-light mb-2">How would you describe your skin?</h2>
        <p className="text-text-secondary text-sm mb-8">Your skin is your largest organ. What contacts it for 8 hours matters more than what touches it during the day.</p>

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
