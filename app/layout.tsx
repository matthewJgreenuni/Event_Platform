import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'

// imports a font
const poppins = Poppins({
   subsets: ['latin'],
   weight: ['400', '500', '600', '700'],
   variable: '--font-poppins'
  })

export const metadata: Metadata = {
  title: 'Evently',
  description: 'Create Events',
  icons: {
    icon: './assets/images/logo.svg'
  }
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  //when using clerk, you must wrap your base layout in a clerk provider (clerk requires a middleware file)
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={poppins.variable}>{children}</body>
      </html>
    </ClerkProvider>
  )
}
