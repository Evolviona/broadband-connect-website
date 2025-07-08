import './globals.css'
import Navigation from '@/components/Navigation/Navigation'
import ScrollProgress from '@/components/ui/ScrollProgress'

export const metadata = {
  title: 'Broadband Connect - Telecommunications Training',
  description: 'Professional telecommunications training that builds careers. Accredited training for telecommunications professionals.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen">
          <Navigation />
          <ScrollProgress position="top" variant="fiber" />
          <main className="pt-16">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}