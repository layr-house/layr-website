
"use client";

import type { Lang } from '@/lib/i18n'

interface Step0HeroProps {
  lang: Lang
  onLangChange: (lang: Lang) => void
  onStart: () => void
}

export default function Step0Hero({ lang, onLangChange, onStart }: Step0HeroProps) {
  const content = {
    en: {
      badge: "RECOVERY STARTS HERE",
      headline1: "You optimize",
      headlineAccent: "everything.",
      headline2: "Except the surface you recover on.",
      statNumber: "8",
      statLabel: "HOURS",
      statSubtext: "Every night, your skin absorbs everything.",
      hook: "Is your bedding helping — or contaminating?",
      cta: "Find Out",
      time: "90 seconds",
      questions: "6 questions",
      result: "Personalized result",
    },
    de: {
      badge: "ERHOLUNG BEGINNT HIER",
      headline1: "Du optimierst",
      headlineAccent: "alles.",
      headline2: "Außer die Fläche, auf der du schläfst.",
      statNumber: "8",
      statLabel: "STUNDEN",
      statSubtext: "Jede Nacht nimmt deine Haut alles auf.",
      hook: "Hilft deine Bettwäsche — oder schadet sie?",
      cta: "Entdecken",
      time: "90 Sek.",
      questions: "6 Fragen",
      result: "Dein Ergebnis",
    },
  };

  const t = content[lang];

  return (
    <section className="journey-step blend-bg-recovery">
      {/* Language Toggle */}
      <div className="absolute top-20 right-6">
        <div className="lang-toggle">
          <button
            onClick={() => onLangChange("en")}
            className={lang === "en" ? "active" : ""}
          >
            EN
          </button>
          <button
            onClick={() => onLangChange("de")}
            className={lang === "de" ? "active" : ""}
          >
            DE
          </button>
        </div>
      </div>

      <div className="w-full max-w-2xl mx-auto text-center px-6">
        {/* Badge */}
        <div className="animate-fade-up opacity-0" style={{ animationDelay: "0.1s" }}>
          <span className="label whitespace-nowrap">{t.badge}</span>
        </div>

        {/* Headline */}
        <h1 
          className="mt-6 text-3xl md:text-4xl lg:text-5xl font-light tracking-tight leading-tight animate-fade-up opacity-0"
          style={{ animationDelay: "0.2s" }}
        >
          {t.headline1}{" "}
          <span className="text-accent font-normal">{t.headlineAccent}</span>
          <br />
          <span className="text-text-secondary text-2xl md:text-3xl">{t.headline2}</span>
        </h1>

        {/* Big Stat */}
        <div 
          className="mt-6 mb-4 animate-fade-up opacity-0"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="relative inline-block">
            <div className="absolute inset-0 blur-3xl bg-accent/20 rounded-full scale-150"></div>
            <div className="relative flex flex-col items-center">
              <span 
                className="text-[100px] md:text-[120px] font-extralight leading-none text-white tracking-tighter"
                style={{ textShadow: "0 0 60px rgba(79, 106, 232, 0.3)" }}
              >
                {t.statNumber}
              </span>
              <div className="text-lg md:text-xl font-medium tracking-[0.3em] text-text-secondary -mt-1">
                {t.statLabel}
              </div>
            </div>
          </div>
        </div>

        {/* Hook text */}
        <div className="mt-4">
          <p className="text-base text-text-secondary">{t.statSubtext}</p>
          <p className="mt-2 text-lg md:text-xl font-medium text-white">{t.hook}</p>
        </div>

        {/* CTA Button */}
        <div 
          className="mt-6 animate-fade-up opacity-0"
          style={{ animationDelay: "0.6s" }}
        >
          <button
            onClick={onStart}
            className="btn-gold text-base px-10 py-4"
          >
            <span>{t.cta}</span>
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </button>
        </div>

        {/* Trust indicators */}
        <div 
          className="mt-8 flex items-center justify-center gap-6 text-sm text-text-muted animate-fade-up opacity-0"
          style={{ animationDelay: "0.8s" }}
        >
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{t.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span>{t.questions}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            <span>{t.result}</span>
          </div>
        </div>
      </div>
    </section>
  );
}