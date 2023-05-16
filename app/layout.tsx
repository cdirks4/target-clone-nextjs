import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from './components/Navbar'
import SearchBar from './components/SearchBar'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Target Clone',
  description: 'Targets site rebuilt in Nextjs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={inter.className}>
      <Navbar></Navbar>
      <SearchBar></SearchBar>
            {children}
      </body>
    </html>
  )

}
