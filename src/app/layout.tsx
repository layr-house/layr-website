import type { Metadata } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Layr — Recovery Starts at the Surface',
  description: 'Performance bedding engineered from natural fiber blends. Matched to your recovery needs. Hemp, bamboo, eucalyptus, banana fiber. Certified. Tested. Built for athletes.',
  keywords: 'performance bedding, hemp sheets, bamboo bedding, recovery sleep, athlete sleep, antimicrobial sheets, natural fiber bedding',
  openGraph: {
    title: 'Layr — Recovery Starts at the Surface',
    description: 'You optimize everything. Except the surface you recover on. Take 90 seconds to find your matched fiber blend.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
