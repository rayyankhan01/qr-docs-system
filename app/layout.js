import { Inter } from 'next/font/google'
import Providers from '@/components/layout/Providers'
import './globals.css'

// next/font self-hosts the font at build time and exposes it as a CSS
// variable, which lib/theme.js then reads via `var(--font-inter)`.
const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
})

export const metadata = {
  title: 'QR Document System',
  description: 'Machine Document Management',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={inter.variable}>
            <body>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    )
}