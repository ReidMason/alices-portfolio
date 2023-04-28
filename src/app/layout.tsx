import { MainLayout } from "~/components/layouts/MainLayout";
import "../styles/globals.css";

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
      <MainLayout>
        {children}
      </MainLayout>
    </html>
  )
}
