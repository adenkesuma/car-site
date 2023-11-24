import type { Metadata } from 'next'

import './globals.css'
import { Footer, Navbar } from '@/components'

export const metadata: Metadata = {
  title: 'Car Site',
  description: 'Discover the best cars in the world',
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children } : RootLayoutProps) {
  return (
    <html lang="en">
      <body className='relative'>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
