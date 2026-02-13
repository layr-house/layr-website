"use client"

interface ContinueButtonProps {
  onClick: () => void
  disabled?: boolean
  label?: string
}

export default function ContinueButton({ onClick, disabled = false, label = 'Continue' }: ContinueButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`mt-8 px-8 py-3 text-sm font-medium tracking-wider uppercase transition-all duration-300 ${
        disabled
          ? 'bg-surface-2 text-text-muted border border-border-color cursor-not-allowed'
          : 'bg-accent text-bg border border-accent hover:bg-accent-hover cursor-pointer'
      }`}
    >
      {label}
    </button>
  )
}
