import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import QueryProvider from '@/providers/QueryProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Rumah Belajar Jannati - Islamic Learning Center',
  description: 'Rumah Belajar Jannati is a comprehensive Islamic learning center offering Quranic Pre-School, TPA, and various Islamic courses based on Al Quran and Sunnah.',
  keywords: 'Islamic education, Quran, TPA, Tahsin, Arabic course, Islamic preschool, Jakarta',
  authors: [{ name: 'Rumah Belajar Jannati' }],
  openGraph: {
    title: 'Rumah Belajar Jannati - Islamic Learning Center',
    description: 'Comprehensive Islamic education based on Al Quran and Sunnah',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  )
}
