// src/app/layout.tsx
import "./globals.css"; // Global styles (e.g., TailwindCSS or custom CSS)
import { ReactNode } from "react";
import { Wallet } from "@/components/Wallet";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "G-Meter Dashboard",
  description: "Analyze your G-Meter score on Solana!",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white min-h-screen">
        <Wallet>
          <Header />
          <main className="max-w-7xl mx-auto p-4">{children}</main>
          <Footer />
        </Wallet>
      </body>
    </html>
  );
}
