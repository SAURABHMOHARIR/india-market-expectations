import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Next.js optimizes this
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { cn } from "@/lib/utils";
import { AuthProvider } from "@/lib/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "India Market Expectations",
  description: "Probability-based intelligence for Indian markets.",
};

import { Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "min-h-screen bg-background antialiased text-foreground")}>
        <AuthProvider>
          <Suspense fallback={<div className="h-16 border-b bg-card sticky top-0 z-50" />}>
            <Navbar />
          </Suspense>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
