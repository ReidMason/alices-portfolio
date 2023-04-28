import Head from 'next/head'
import React from 'react'
import { Navbar } from '../Navbar'

interface MainLayoutProps {
  children: React.ReactNode
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <Head>
        <title>Alice&apos;s portfolio</title>
        <meta name="description" content="Alice's portfolio" />
      </Head>
      <body className="m-4 md:m-20 mt-8 md:mt-16 md:overflow-auto">
        <Navbar />
        {children}
      </body>
    </>
  )
}
