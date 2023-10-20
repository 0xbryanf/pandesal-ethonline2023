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
      <body className={inter.className + ' h-screen box-border'}>
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