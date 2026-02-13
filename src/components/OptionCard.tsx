"use client"

interface OptionCardProps {
  title: string
  description?: string
  selected: boolean
  onClick: () => void
  icon?: string
}

export default function OptionCard({ title, description, selected, onClick, icon }: OptionCardProps) {
  return (
    <button
      className={`option-card ${selected ? 'selected' : ''}`}
      onClick={onClick}
      aria-pressed={selected}
    >
      <div className="flex items-start gap-3">
        {icon && <span className="text-lg mt-0.5 flex-shrink-0">{icon}</span>}
        <div>
          <div className="option-title">{title}</div>
          {description && <div className="option-desc">{description}</div>}
        </div>
      </div>
    </button>
  )
}
