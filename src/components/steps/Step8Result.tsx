"use client"

import { useEffect, useState } from 'react'
import PropertyBar from '@/components/PropertyBar'
import type { ProductRecommendation } from '@/types/journey'

interface Step8Props {
  recommendation: ProductRecommendation
  onRestart: () => void
}

export default function Step8Result({ recommendation, onRestart }: Step8Props) {
  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const { blend, reasoning, set } = recommendation

  useEffect(() => {
    setTimeout(() => setVisible(true), 300)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

  return (
    <div className={`max-w-2xl w-full transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      {/* Header */}
      <div className="text-center mb-10">
        <span className="label mb-4 block">Your Recovery Surface</span>
        <h2 className="text-3xl md:text-4xl font-light mb-3">
          The <span className="text-accent">{blend.name}</span>
        </h2>
        <p className="text-text-secondary text-lg">{blend.tagline}</p>
      </div>

      {/* Main Card */}
      <div className="reco-card mb-6">
        {/* Blend info */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-3 h-3 rounded-full bg-accent" />
          <span className="text-sm text-text-secondary">
            {blend.primary} + {blend.secondary}
          </span>
        </div>

        <p className="text-text-primary text-base leading-relaxed mb-8">{blend.description}</p>

        {/* Properties */}
        <div className="space-y-3 mb-8">
          <PropertyBar label="Thermoregulation" value={blend.properties.thermoregulation} delay={400} />
          <PropertyBar label="Moisture Control" value={blend.properties.moisture} delay={600} />
          <PropertyBar label="Antimicrobial" value={blend.properties.antimicrobial} delay={800} />
          <PropertyBar label="Softness" value={blend.properties.softness} delay={1000} />
          <PropertyBar label="Durability" value={blend.properties.durability} delay={1200} />
        </div>

        {/* Best for */}
        <div className="flex flex-wrap gap-2 mb-6">
          {blend.bestFor.map((tag) => (
            <span key={tag} className="text-xs px-3 py-1 bg-surface-2 border border-border-color text-text-secondary">
              {tag}
            </span>
          ))}
        </div>

        {/* Certifications */}
        <div className="border-t border-border-color pt-4">
          <div className="flex flex-wrap gap-4">
            {blend.certifications.map((cert) => (
              <span key={cert} className="text-xs text-text-muted">✓ {cert}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Reasoning */}
      <div className="bg-surface border border-border-color p-6 mb-6">
        <span className="label mb-3 block">Why This Blend</span>
        <p className="text-sm text-text-secondary leading-relaxed">{reasoning}</p>
      </div>

      {/* Your Set */}
      <div className="bg-surface border border-border-color p-6 mb-8">
        <span className="label mb-4 block">Your Recommended Set</span>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-border-color">
            <span className="text-sm text-text-primary">Fitted Sheet</span>
            <span className="text-xs text-text-muted">{blend.primary} + {blend.secondary}</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-border-color">
            <span className="text-sm text-text-primary">Duvet Cover</span>
            <span className="text-xs text-text-muted">{blend.primary} + {blend.secondary}</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-text-primary">Pillow Cases (pair)</span>
            <span className="text-xs text-text-muted">{blend.primary} + {blend.secondary}</span>
          </div>
        </div>
      </div>

      {/* CTA */}
      {!submitted ? (
        <div className="text-center">
          <p className="text-text-secondary text-sm mb-4">
            We&apos;re launching soon. Join the waitlist and be first to recover on your matched blend.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 px-4 py-3 bg-surface border border-border-color text-text-primary text-sm placeholder:text-text-muted focus:border-accent focus:outline-none transition-colors"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-accent text-bg text-sm font-medium tracking-wider uppercase hover:bg-accent-hover transition-colors"
            >
              Join Waitlist
            </button>
          </form>
          <p className="text-text-muted text-xs mt-4">No spam. Just your launch notification + a recovery guide.</p>
        </div>
      ) : (
        <div className="text-center bg-surface border border-accent/20 p-8">
          <div className="text-accent text-2xl mb-3">✓</div>
          <h3 className="text-lg font-light text-text-primary mb-2">You&apos;re on the list.</h3>
          <p className="text-sm text-text-secondary mb-1">
            We&apos;ll notify you when the {blend.name} is ready to ship.
          </p>
          <p className="text-xs text-text-muted">Your Whoop will thank you.</p>
        </div>
      )}

      {/* Restart */}
      <div className="text-center mt-10">
        <button
          onClick={onRestart}
          className="text-text-muted text-xs hover:text-text-secondary transition-colors underline underline-offset-4"
        >
          Retake the assessment
        </button>
      </div>
    </div>
  )
}
