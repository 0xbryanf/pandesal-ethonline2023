import NavBar from '@/app/components/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import { Suspense } from 'react'
import Loading from './loading'
import { LogInProvider } from "./context/LogInContext";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Pandesal Easy App',
  description: 'Join your friends today!',
}

export default function RootLayout({ children }: any) {
  return (
    <html lang="en">
      <body className={inter.className}
      style={{
        backgroundImage: `
        radial-gradient(950px circle at 0% 100%,
          hsla(261, 93%, 75%, 0.5) 0%,
          hsla(201, 93%, 80%, 0.5) 35%,
          hsla(181, 93%, 90%, 0.5) 50%,
          transparent 100%)`,
        backgroundAttachment: 'fixed'
      }}>
      <Suspense fallback={<Loading/>}>
        <LogInProvider>

        <NavBar/>
          {children}

        </LogInProvider>
      </Suspense>
      </body>
    </html>
  )
}