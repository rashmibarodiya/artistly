// import './globals.css'

// import type { Metadata } from 'next'
// import Header from '@/components/Header'
// import Providers from '@/Provider'

// export const metadata: Metadata = {
//   title: 'Artistly.com',
//   description: 'Performing Artist Booking Platform',
// }

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en">
//       <body className="min-h-screen flex flex-col  ">
//         <Providers>
//         <Header />
//          <main className="flex-1">{children}</main>
//         <footer className="p-4 text-center text-sm text-gray-500 mt-8">© 2026 Artistly.com</footer> 
//         </Providers>
       
//       </body>
//     </html>
//   )
// }
import './globals.css'
import { Bebas_Neue, Inter } from "next/font/google";

const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-display" });
const inter = Inter({ subsets: ["latin"], variable: "--font-body" });

import type { Metadata } from 'next'
import Header from '@/components/Header'
import Providers from '@/Provider'

export const metadata: Metadata = {
  title: 'Artistly.com',
  description: 'Performing Artist Booking Platform',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bebas.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col font-body bg-marquee-bg text-marquee-cream">
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <footer className="p-4 text-center text-sm text-marquee-cream/40 border-t border-marquee-plum/40">
            © 2026 Artistly.com
          </footer>
        </Providers>
      </body>
    </html>
  )
}