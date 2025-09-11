
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DarkModeToggle from "./components/DarkModeToggle";

// font
const inter = Inter({ subsets: ["latin"] });
//SEO tags
export const metadata: Metadata = {
  title: "Samar Khaled Portfolio",
  description: "Frontend Developer | React | Next.js | Tailwind",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
       <body className={`${inter.className} bg-white dark:bg-gray-900`}>
        {/* Header */}
        <Header />

        {/* Main content */}
        <main className="min-h-screen">{children}</main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
