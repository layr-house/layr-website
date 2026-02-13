"use client"

import { useEffect, useState } from 'react'

interface PropertyBarProps {
  label: string
  value: number
  delay?: number
}

export default function PropertyBar({ label, value, delay = 0 }: PropertyBarProps) {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setWidth(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return (
    <div className="flex items-center gap-4">
      <span className="text-xs text-text-secondary w-32 flex-shrink-0">{label}</span>
      <div className="property-bar flex-1">
        <div className="property-fill" style={{ width: `${width}%` }} />
      </div>
      <span className="text-xs text-text-muted w-8 text-right">{value}%</span>
    </div>
  )
}
