"use client"

import { useEffect, useState } from 'react'

interface Step0Props {
  onStart: () => void
}

export default function Step0Hero({ onStart }: Step0Props) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => setVisible(true), 200)
  }, [])

  return (
    <div className="journey-step">
      <div className={`max-w-prose text-center transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <span className="label mb-6 block">Recovery Starts Here</span>

        <h1 className="text-3xl md:text-5xl font-light leading-tight tracking-tight mb-6">
          You optimize <span className="text-accent">everything</span>.
          <br />
          <span className="text-text-secondary">Except the surface you recover on.</span>
        </h1>

        <p className="text-text-secondary text-base md:text-lg leading-relaxed mb-4 max-w-md mx-auto">
          Your body repairs itself during sleep. The material touching your skin for 8 hours is either helping that process — or contaminating it.
        </p>

        <p className="text-text-muted text-sm mb-10">
          Take 90 seconds. Answer honestly. We&apos;ll show you what your recovery surface should be.
        </p>

        <button
          onClick={onStart}
          className="px-10 py-4 bg-accent text-bg text-sm font-medium tracking-widest uppercase hover:bg-accent-hover transition-all duration-300"
        >
          Begin
        </button>

        <div className="mt-16 flex items-center justify-center gap-8 text-text-muted text-xs">
          <span>90 seconds</span>
          <span className="w-px h-3 bg-border-color" />
          <span>6 questions</span>
          <span className="w-px h-3 bg-border-color" />
          <span>Personalized result</span>
        </div>
      </div>
    </div>
  )
}
