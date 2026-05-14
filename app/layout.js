import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { ThemeProvider } from '@mui/material/styles'
import theme from '@/lib/theme'
import '@mui/material/styles'
import Providers from '@/components/layout/Providers'
export const metadata = {
  title: 'QR Document System',
  description: 'Machine Document Management',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    )
}