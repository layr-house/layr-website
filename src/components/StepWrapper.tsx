"use client"

import { ReactNode, useEffect, useState } from 'react'

interface StepWrapperProps {
  children: ReactNode
  isActive: boolean
}

export default function StepWrapper({ children, isActive }: StepWrapperProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => setVisible(true), 100)
      return () => clearTimeout(timer)
    }
    setVisible(false)
  }, [isActive])

  if (!isActive) return null

  return (
    <div
      className={`journey-step transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      {children}
    </div>
  )
}
