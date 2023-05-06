import { MainLayout } from "~/components/layouts/MainLayout";
import "../styles/globals.css";
import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: "Alice Collins",
  description: "Alice Collins portfolio",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Analytics />
      <MainLayout>
        {children}
      </MainLayout>
    </html>
  )
}
