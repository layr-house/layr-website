"use client"

interface BackButtonProps {
  onClick: () => void
}

export default function BackButton({ onClick }: BackButtonProps) {
  return (
    <button
      onClick={onClick}
      className="absolute top-6 left-6 text-text-muted hover:text-text-secondary text-sm flex items-center gap-2 transition-colors z-50"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      Back
    </button>
  )
}
