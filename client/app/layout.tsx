import NavBar from '@/app/components/NavBar'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Pandesal Easy App',
  description: 'Join your friends today!',
}

export default function RootLayout({ children }: any) {
  return (
    <html lang="en">
      <body className={inter.className + ' h-screen box-border'}>
      <NavBar/>
        {children}
      </body>
    </html>
  )
}