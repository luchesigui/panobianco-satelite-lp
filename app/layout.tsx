import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import { Suspense } from "react"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Academia Panobianco | Redescubra o Prazer de se Cuidar",
  description:
    "Esqueça a monotonia, os equipamentos velhos e a falta de motivação. Na Panobianco, seu plano não te dá acesso apenas a uma academia, mas a um estilo de vida completo, tecnológico e sem amarras.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.png" />
        <meta name="theme-color" content="#f15927" />
      </head>
      <body className={inter.className}>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
