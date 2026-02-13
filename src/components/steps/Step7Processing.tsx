"use client"

import { useEffect, useState } from 'react'

interface Step7Props {
  onComplete: () => void
}

const steps = [
  'Analyzing your sleep profile...',
  'Matching fiber properties...',
  'Calculating optimal blend ratios...',
  'Building your recommendation...',
]

export default function Step7Processing({ onComplete }: Step7Props) {
  const [currentLine, setCurrentLine] = useState(0)

  useEffect(() => {
    const timers = steps.map((_, i) =>
      setTimeout(() => setCurrentLine(i), i * 900)
    )
    const complete = setTimeout(onComplete, steps.length * 900 + 600)
    return () => {
      timers.forEach(clearTimeout)
      clearTimeout(complete)
    }
  }, [onComplete])

  return (
    <div className="max-w-sm w-full text-center">
      <div className="mb-10">
        <div className="w-12 h-12 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
      </div>

      <div className="space-y-3">
        {steps.map((step, i) => (
          <p
            key={step}
            className={`text-sm transition-all duration-500 ${
              i <= currentLine ? 'opacity-100 text-text-secondary' : 'opacity-0 text-text-muted'
            } ${i === currentLine ? 'text-text-primary' : ''}`}
          >
            {i < currentLine ? '✓' : i === currentLine ? '→' : '·'} {step}
          </p>
        ))}
      </div>
    </div>
  )
}
