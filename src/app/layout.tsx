import './globals.css'
import type { Metadata } from 'next'
import Header from '@/components/Header'

export const metadata: Metadata = {
  title: 'Artistly.com',
  description: 'Performing Artist Booking Platform',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white text-gray-800">
        <Header />
        <main className="flex-1 p-4">{children}</main>
        <footer className="p-4 text-center text-sm text-gray-500 mt-8">© 2025 Artistly.com</footer>
      </body>
    </html>
  )
}
