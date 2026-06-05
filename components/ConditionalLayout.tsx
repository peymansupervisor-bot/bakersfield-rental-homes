'use client'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

export default function ConditionalLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isStudio = pathname?.startsWith('/studio')
  return (
    <>
      {!isStudio && <Navbar />}
      {children}
      {!isStudio && <Footer />}
    </>
  )
}
