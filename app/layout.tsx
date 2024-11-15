import './global.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { baseUrl } from './sitemap'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'hex2ansi',
    template: '%s | ansi converter',
  },
  description: 'hexadecimal to ansi converter',
  openGraph: {
    title: 'hex2ansi',
    description: 'hex2ansi',
    url: baseUrl,
    siteName: 'ansi converter',
    locale: 'en_GB',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const cx = (...classes) => classes.filter(Boolean).join(' ')

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html
        lang="en"
        className={cx(
            'text-black bg-white dark:text-white dark:bg-[#1a1a1a]',
            GeistSans.variable,
            GeistMono.variable
        )}
    >
      <body className="antialiased max-w-xl lg:mx-auto">
        <main className="flex justify-center items-center min-h-screen min-w-0 mt-6 flex flex-col md:px-0">
          {children}
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  )
}
