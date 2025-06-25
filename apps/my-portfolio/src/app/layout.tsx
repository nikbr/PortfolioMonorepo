import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "next-themes"
import { Inter } from "next/font/google"
import { I18nProvider } from "@/contexts/i18n-context"
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Portfolio - Full-Stack Developer & English Instructor",
  description: "Professional portfolio showcasing web development and English teaching services",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <script src="https://web3forms.com/client/script.js" async defer></script>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <I18nProvider>{children}</I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
