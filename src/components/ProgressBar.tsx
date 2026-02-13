"use client"

interface ProgressBarProps {
  current: number
  total: number
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = ((current + 1) / total) * 100

  return (
    <div className="progress-track" role="progressbar" aria-valuenow={current + 1} aria-valuemin={1} aria-valuemax={total}>
      <div className="progress-fill" style={{ width: `${percentage}%` }} />
    </div>
  )
}
