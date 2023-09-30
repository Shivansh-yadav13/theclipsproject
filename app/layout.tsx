import SupabaseProvider from "@/app/supabase/supabase-provider";
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FusionClips AI',
  description: 'Long Livestreams 📺 to Engaging Clips 🎞️ with 1-Click.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='dark overflow-x-hidden'>
      <body>
        <SupabaseProvider>
          <div className='flex flex-col h-screen justify-between'>
            <div className='h-screen w-screen'>
              {children}
            </div>
          </div>
        </SupabaseProvider>
      </body>
    </html>
  )
}
