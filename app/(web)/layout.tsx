import Navbar from '@/components/web/Navbar'
import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'FusionClips AI',
  description: 'Long Livestreams 📺 to Engaging Clips 🎞️ with 1-Click.',
}

export default async function WebGroupLayout({
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
