import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Metode Numerik - Interactive Learning System",
  description: "Platform pembelajaran interaktif untuk Metode Numerik dengan eksekusi Python langsung di browser. Course ELT60214 - Teknik Elektro UNY.",
  keywords: ["Metode Numerik", "Numerical Methods", "Python", "Pyodide", "Teknik Elektro", "ELT60214", "UNY", "Interactive Learning"],
  authors: [{ name: "Z.ai Development Team" }],
  openGraph: {
    title: "Metode Numerik - Interactive Learning System",
    description: "Platform pembelajaran interaktif untuk Metode Numerik",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-background text-foreground`}
      >
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
