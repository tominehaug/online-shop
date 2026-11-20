import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tretten",
  description:
    "Tretten online store sells everything you need and plenty you didn't know you did. Electronics, home, fashion and more, all in one place.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background">
        <Suspense>
          <Header />
        </Suspense>
        <main className="flex flex-col flex-1">{children}</main>
        <footer className="border-t-accent border-t-2 text-center p-4 w-full bg-background">
          <p>&copy; 2026 Tretten Online Store</p>
        </footer>
      </body>
    </html>
  );
}
