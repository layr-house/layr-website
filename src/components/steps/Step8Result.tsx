"use client"

import { useState, useEffect, useRef } from 'react'
import type { Lang } from '@/lib/i18n'
import { translations } from '@/lib/i18n'
import type { ProductRecommendation } from '@/types/journey'

interface Step8ResultProps {
  lang: Lang
  recommendation: ProductRecommendation
  onRestart: () => void
}

// ===== BLEND THEME SYSTEM =====
const BLEND_THEMES: Record<string, {
  gradient: string
  glow: string
  accent: string
  accentRgb: string
  icon: string
}> = {
  cool: {
    gradient: 'linear-gradient(180deg, #0a1628 0%, #0f1f3a 25%, #132a4a 50%, #0f1f3a 75%, #0a1628 100%)',
    glow: 'radial-gradient(ellipse 80% 50% at 50% 20%, rgba(126,184,212,0.12) 0%, transparent 70%)',
    accent: '#7eb8d4',
    accentRgb: '126,184,212',
    icon: '❄️',
  },
  warm: {
    gradient: 'linear-gradient(180deg, #1a1008 0%, #231508 25%, #2a1a0a 50%, #231508 75%, #1a1008 100%)',
    glow: 'radial-gradient(ellipse 80% 50% at 50% 20%, rgba(212,165,116,0.12) 0%, transparent 70%)',
    accent: '#d4a574',
    accentRgb: '212,165,116',
    icon: '🏔️',
  },
  recovery: {
    gradient: 'linear-gradient(180deg, #0f1a0a 0%, #152210 25%, #1a2a14 50%, #152210 75%, #0f1a0a 100%)',
    glow: 'radial-gradient(ellipse 80% 50% at 50% 20%, rgba(143,184,126,0.12) 0%, transparent 70%)',
    accent: '#8fb87e',
    accentRgb: '143,184,126',
    icon: '🧘',
  },
  shield: {
    gradient: 'linear-gradient(180deg, #141418 0%, #1a1a22 25%, #20202a 50%, #1a1a22 75%, #141418 100%)',
    glow: 'radial-gradient(ellipse 80% 50% at 50% 20%, rgba(180,180,210,0.10) 0%, transparent 70%)',
    accent: '#b4b4d2',
    accentRgb: '180,180,210',
    icon: '🛡️',
  },
  balanced: {
    gradient: 'linear-gradient(180deg, #0a1616 0%, #0f2220 25%, #142a28 50%, #0f2220 75%, #0a1616 100%)',
    glow: 'radial-gradient(ellipse 80% 50% at 50% 20%, rgba(126,196,184,0.12) 0%, transparent 70%)',
    accent: '#7ec4b8',
    accentRgb: '126,196,184',
    icon: '⚖️',
  },
}

// ===== PRODUCT CATALOG =====
interface Product {
  key: string
  price: number
  icon: string
}

const PRODUCTS: Product[] = [
  { key: 'fittedSheet', price: 89, icon: '🛏️' },
  { key: 'duvetCover', price: 129, icon: '☁️' },
  { key: 'pillowCases', price: 59, icon: '💤' },
]

const BUNDLE_DISCOUNT = 0.15

export default function Step8Result({ lang, recommendation, onRestart }: Step8ResultProps) {
  const t = translations[lang].result
  const { blend, reasoning } = recommendation
  const theme = BLEND_THEMES[blend.id] || BLEND_THEMES.balanced
  
  const [showSticky, setShowSticky] = useState(false)
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set(['bundle']))
  const [animateIn, setAnimateIn] = useState(false)
  const productSectionRef = useRef<HTMLDivElement>(null)
  
  // Animate in on mount
  useEffect(() => {
    const timer = setTimeout(() => setAnimateIn(true), 100)
    return () => clearTimeout(timer)
  }, [])
  
  // Sticky CTA on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (productSectionRef.current) {
        const rect = productSectionRef.current.getBoundingClientRect()
        setShowSticky(rect.top < -200)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  // Price calculations
  const individualTotal = PRODUCTS.reduce((sum, p) => sum + p.price, 0)
  const bundlePrice = Math.round(individualTotal * (1 - BUNDLE_DISCOUNT))
  const savings = individualTotal - bundlePrice
  
  const isBundle = selectedProducts.has('bundle')
  
  const toggleProduct = (key: string) => {
    if (key === 'bundle') {
      setSelectedProducts(new Set(['bundle']))
    } else {
      const next = new Set(selectedProducts)
      next.delete('bundle')
      if (next.has(key)) {
        next.delete(key)
      } else {
        next.add(key)
      }
      // If all 3 selected individually, switch to bundle
      if (next.size === 3 && PRODUCTS.every(p => next.has(p.key))) {
        setSelectedProducts(new Set(['bundle']))
      } else if (next.size === 0) {
        setSelectedProducts(new Set(['bundle']))
      } else {
        setSelectedProducts(next)
      }
    }
  }
  
  const currentTotal = isBundle 
    ? bundlePrice 
    : PRODUCTS.filter(p => selectedProducts.has(p.key)).reduce((s, p) => s + p.price, 0)

  // Property labels mapping
  const propertyIcons: Record<string, string> = {
    thermoregulation: '🌡️',
    moisture: '💧',
    antimicrobial: '🛡️',
    softness: '☁️',
    durability: '⚡',
  }

  return (
    <>
      {/* ===== IMMERSIVE WRAPPER ===== */}
      <div 
        className="result-immersive"
        style={{
          '--blend-accent': theme.accent,
          '--blend-accent-rgb': theme.accentRgb,
          '--blend-gradient': theme.gradient,
          '--blend-glow': theme.glow,
        } as React.CSSProperties}
      >
        
        {/* ============================================ */}
        {/* SECTION 1: THE REVEAL (Full viewport hero)   */}
        {/* ============================================ */}
        <section className="result-hero">
          {/* Glow overlay */}
          <div className="result-hero__glow" />
          
          <div className={`result-hero__content ${animateIn ? 'animate-in' : ''}`}>
            {/* Label */}
            <span className="result-label">{t.label}</span>
            
            {/* Product Image Placeholder */}
            <div className="result-hero__image">
              <div className="result-hero__image-placeholder">
                <span className="result-hero__image-icon">{theme.icon}</span>
              </div>
            </div>
            
            {/* Blend Name - Editorial Typography */}
            <h1 className="result-hero__title">
              <span className="result-hero__title-the">{t.the}</span>
              <span className="result-hero__title-name">{blend.name}</span>
            </h1>
            
            {/* Tagline */}
            <p className="result-hero__tagline">{blend.tagline}</p>
            
            {/* Composition - Minimal */}
            <div className="result-hero__fibers">
              <span>{blend.primary}</span>
              <span className="result-hero__fiber-dot">·</span>
              <span>{blend.secondary}</span>
            </div>
            
            {/* Scroll indicator */}
            <div className="result-hero__scroll">
              <span className="result-hero__scroll-text">
                {lang === 'de' ? 'Mehr erfahren' : 'Explore your blend'}
              </span>
              <div className="result-hero__scroll-line" />
            </div>
          </div>
        </section>
        
        {/* ============================================ */}
        {/* SECTION 2: THE SCIENCE (Why this blend)      */}
        {/* ============================================ */}
        <section className="result-science">
          <div className="result-section__inner">
            
            {/* Personalized Reasoning */}
            <div className="result-reasoning">
              <h2 className="result-section__title">{t.whyThis}</h2>
              <p className="result-reasoning__text">{reasoning}</p>
            </div>
            
            {/* Description */}
            <p className="result-description">{blend.description}</p>
            
            {/* Compact Performance Metrics */}
            <div className="result-metrics">
              <h3 className="result-metrics__label">{t.properties}</h3>
              <div className="result-metrics__grid">
                {Object.entries(blend.properties).map(([key, value]) => (
                  <div key={key} className="result-metric">
                    <div className="result-metric__ring">
                      <svg viewBox="0 0 36 36" className="result-metric__svg">
                        <path
                          className="result-metric__bg"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                        />
                        <path
                          className="result-metric__fill"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="var(--blend-accent)"
                          strokeWidth="3"
                          strokeDasharray={`${value}, 100`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="result-metric__value">{value}</span>
                    </div>
                    <span className="result-metric__name">
                      {t.propertyLabels[key as keyof typeof t.propertyLabels]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Best For + Certifications in a row */}
            <div className="result-tags-row">
              <div className="result-tags-group">
                <span className="result-tags-group__label">{t.bestFor}</span>
                <span className="result-tags-group__items">
                  {blend.bestFor.join('  ·  ')}
                </span>
              </div>
              <div className="result-tags-group">
                <span className="result-tags-group__label">
                  {lang === 'de' ? 'Zertifiziert' : 'Certified'}
                </span>
                <span className="result-tags-group__items">
                  {blend.certifications.join('  ·  ')}
                </span>
              </div>
            </div>
          </div>
        </section>
        
        {/* ============================================ */}
        {/* SECTION 3: THE PRODUCT (Conversion engine)   */}
        {/* ============================================ */}
        <section className="result-products" ref={productSectionRef}>
          <div className="result-section__inner">
            
            <div className="result-products__header">
              <h2 className="result-section__title">
                {lang === 'de' ? 'Dein Komplettset' : 'Your Complete Set'}
              </h2>
              <p className="result-products__subtitle">
                {lang === 'de' 
                  ? 'Alles was du brauchst. Nichts, was du nicht brauchst.' 
                  : 'Everything you need. Nothing you don\'t.'}
              </p>
            </div>
            
            {/* Bundle Card - Primary */}
            <div 
              className={`result-product-bundle ${isBundle ? 'selected' : ''}`}
              onClick={() => toggleProduct('bundle')}
            >
              <div className="result-product-bundle__badge">
                {lang === 'de' ? `Spare ${savings}€` : `Save €${savings}`}
              </div>
              <div className="result-product-bundle__content">
                <div className="result-product-bundle__images">
                  {PRODUCTS.map(p => (
                    <div key={p.key} className="result-product-bundle__img">
                      <span>{p.icon}</span>
                    </div>
                  ))}
                </div>
                <div className="result-product-bundle__info">
                  <h3 className="result-product-bundle__name">
                    {blend.name} — {lang === 'de' ? 'Komplettset' : 'Complete Set'}
                  </h3>
                  <p className="result-product-bundle__includes">
                    {t.products.fittedSheet} + {t.products.duvetCover} + {t.products.pillowCases}
                  </p>
                  <div className="result-product-bundle__pricing">
                    <span className="result-product-bundle__old">€{individualTotal}</span>
                    <span className="result-product-bundle__price">€{bundlePrice}</span>
                  </div>
                </div>
              </div>
              <div className="result-product-bundle__check">
                {isBundle && (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="10" fill="var(--blend-accent)"/>
                    <path d="M6 10l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
            </div>
            
            {/* Divider */}
            <div className="result-products__divider">
              <span>{lang === 'de' ? 'oder einzeln wählen' : 'or choose individually'}</span>
            </div>
            
            {/* Individual Product Cards */}
            <div className="result-product-grid">
              {PRODUCTS.map(product => {
                const isSelected = !isBundle && selectedProducts.has(product.key)
                return (
                  <div 
                    key={product.key}
                    className={`result-product-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => toggleProduct(product.key)}
                  >
                    <div className="result-product-card__image">
                      <span>{product.icon}</span>
                    </div>
                    <h4 className="result-product-card__name">
                      {t.products[product.key as keyof typeof t.products]}
                    </h4>
                    <p className="result-product-card__blend">{blend.name}</p>
                    <span className="result-product-card__price">€{product.price}</span>
                    <div className="result-product-card__check">
                      {isSelected ? (
                        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                          <circle cx="10" cy="10" r="10" fill="var(--blend-accent)"/>
                          <path d="M6 10l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      ) : (
                        <div className="result-product-card__check-empty" />
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
        
        {/* ============================================ */}
        {/* SECTION 4: THE COMMIT (CTA + Trust)          */}
        {/* ============================================ */}
        <section className="result-commit">
          <div className="result-section__inner">
            
            {/* Summary */}
            <div className="result-commit__summary">
              <div className="result-commit__selected">
                <span className="result-commit__selected-label">
                  {isBundle 
                    ? `${blend.name} — ${lang === 'de' ? 'Komplettset' : 'Complete Set'}`
                    : `${selectedProducts.size} ${lang === 'de' ? 'Artikel ausgewählt' : 'items selected'}`
                  }
                </span>
                <span className="result-commit__total">€{currentTotal}</span>
                {isBundle && (
                  <span className="result-commit__savings">
                    {lang === 'de' ? `Du sparst €${savings}` : `You save €${savings}`}
                  </span>
                )}
              </div>
            </div>
            
            {/* CTA Button */}
            <button className="result-commit__cta" onClick={() => {
              // Future: navigate to /checkout
              // For now, scroll to top or show toast
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}>
              {lang === 'de' ? 'Weiter zur Kasse' : 'Continue to Checkout'}
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="result-commit__cta-arrow">
                <path d="M4 10h12m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            {/* Trust Signals */}
            <div className="result-commit__trust">
              <div className="result-commit__trust-item">
                <span>🚚</span>
                <span>{lang === 'de' ? 'Kostenloser Versand' : 'Free Shipping'}</span>
              </div>
              <div className="result-commit__trust-item">
                <span>🔄</span>
                <span>{lang === 'de' ? '30 Nächte testen' : '30-Night Trial'}</span>
              </div>
              <div className="result-commit__trust-item">
                <span>✅</span>
                <span>{lang === 'de' ? 'OEKO-TEX zertifiziert' : 'OEKO-TEX Certified'}</span>
              </div>
            </div>
            
            {/* Restart */}
            <button className="result-commit__restart" onClick={onRestart}>
              {lang === 'de' ? 'Quiz wiederholen' : 'Retake the quiz'}
            </button>
          </div>
        </section>
      </div>
      
      {/* ===== STICKY BOTTOM BAR ===== */}
      <div className={`result-sticky ${showSticky ? 'visible' : ''}`}>
        <div className="result-sticky__inner">
          <div className="result-sticky__info">
            <span className="result-sticky__blend">{blend.name}</span>
            <span className="result-sticky__price">€{currentTotal}</span>
            {isBundle && <span className="result-sticky__save">{lang === 'de' ? `-${savings}€` : `Save €${savings}`}</span>}
          </div>
          <button className="result-sticky__cta" onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}>
            {lang === 'de' ? 'Zur Kasse' : 'Checkout'}
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
              <path d="M4 10h12m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </>
  )
}
