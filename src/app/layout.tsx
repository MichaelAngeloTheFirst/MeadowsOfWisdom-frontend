import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NavbarSimple } from "./components/NavbarSimple";
import { ThemeProvider } from "@/lib/material";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Meadows Of Wisdom",
  description: "Learn and share knowladge",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <NavbarSimple />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
