import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Phishing Email Generator',
  description: 'Dev By Kami',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
