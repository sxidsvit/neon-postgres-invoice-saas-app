import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Invoicer',
  description:
    " This is an invoicing web app that allows users to add their bank information, manage a list of customers, create and send invoices to customers and also  print and send React components as invoices and email templates directly from the application to the customer's email",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <nav className="flex justify-between items-center h-[10vh] px-8 border-b-[1px]">
            <Link href="/" className="text-xl font-extrabold text-blue-700">
              Invoicer
            </Link>
            <div className="flex items-center gap-5">
              {/*-- if user is signed out --*/}
              <SignedOut>
                <SignInButton mode="modal" />
              </SignedOut>
              {/*-- if user is signed in --*/}
              <SignedIn>
                <Link href="/dashboard" className="">
                  Dashboard
                </Link>
                <UserButton showName />
              </SignedIn>
            </div>
          </nav>

          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
