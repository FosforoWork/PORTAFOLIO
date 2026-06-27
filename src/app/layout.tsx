import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import { LenisProvider } from "@/components/lenis-provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portafolio | Ingeniería Industrial & Inteligencia de Datos",
  description: "Portafolio profesional de Samuel Aguilera. Ingeniería de Procesos + Inteligencia de Datos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${instrumentSerif.variable}`}
    >
      <body className="min-h-screen bg-[var(--color-oatmeal)] text-[var(--color-charcoal)] font-sans flex flex-col antialiased">
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
