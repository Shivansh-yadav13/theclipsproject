import Navbar from '@/components/web/Navbar'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function AppGroupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='h-screen w-screen'>
      <Navbar />
      {children}
    </div>
  )
}