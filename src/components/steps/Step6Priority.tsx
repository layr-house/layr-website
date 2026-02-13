"use client"

import OptionCard from '@/components/OptionCard'
import ContinueButton from '@/components/ContinueButton'
import BackButton from '@/components/BackButton'

interface Step6Props {
  value: string | null
  onChange: (val: string) => void
  onNext: () => void
  onBack: () => void
}

const options = [
  { id: 'antimicrobial', title: 'Kill the bacteria', desc: 'I want the cleanest possible recovery surface. Antimicrobial is priority #1.', icon: '🧬' },
  { id: 'temperature', title: 'Regulate my temperature', desc: 'I need my sleep surface to adapt — cool when I\'m hot, warm when I\'m cold.', icon: '🌡️' },
  { id: 'moisture', title: 'Manage moisture', desc: 'Sweat and humidity ruin my sleep. I need maximum wicking and breathability.', icon: '💧' },
  { id: 'softness', title: 'Protect my skin', desc: 'Softness and hypoallergenic properties matter most to me.', icon: '🪶' },
]

export default function Step6Priority({ value, onChange, onNext, onBack }: Step6Props) {
  return (
    <>
      <BackButton onClick={onBack} />
      <div className="max-w-lg w-full">
        <span className="label mb-4 block">Your Priority</span>
        <h2 className="text-2xl md:text-3xl font-light mb-2">What matters most to you?</h2>
        <p className="text-text-secondary text-sm mb-8">Every fiber blend optimizes for something. We&apos;ll match yours to what you need most.</p>

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

        <ContinueButton onClick={onNext} disabled={!value} label="Show my results" />
      </div>
    </>
  )
}
