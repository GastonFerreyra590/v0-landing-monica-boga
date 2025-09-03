import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Source_Sans_3 } from "next/font/google"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
})

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-sans",
})

export const metadata: Metadata = {
  title: "Mónica Boga - Mentora Gerencial y de Equipos | Coaching de Liderazgo",
  description:
    "Mentoría estratégica para líderes que buscan claridad, energía y propósito. Programa Rumbo Claro - 6 semanas de transformación profesional.",
  generator: "v0.dev",
  icons: {
    icon: "/icon.jpg",
    shortcut: "/icon.jpg",
    apple: "/icon.jpg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${playfair.variable} ${sourceSans.variable} antialiased`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
