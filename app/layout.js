import '@mui/material/styles'

export const metadata = {
  title: 'QR Document System',
  description: 'Machine Document Management',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}