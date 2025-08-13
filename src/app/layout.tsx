import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alejandro Madrigal - Software Engineer & Web Developer",
  description: "Portafolio de Alejandro Madrigal, Software Engineer Student, Web Developer y Full-Stack Developer",
  icons: {
    icon: "/icono_ale2.png",
    shortcut: "/icono_ale2.png",
    apple: "/icono_ale2.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark:bg-dark dark:text-white bg-light transition-colors`}
      >
        <LanguageProvider>
          <ThemeProvider>
            <Navbar />
            <main className="min-h-screen pt-24">{children}</main>
            <Footer />
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
