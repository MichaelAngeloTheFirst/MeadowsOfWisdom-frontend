'use client';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NavbarSimple } from './components/NavbarSimple';
import { ThemeProvider } from '@/lib/material';
import FunFactGlobal from '@/app/components/FunFactGlobal';

const inter = Inter({ subsets: ['latin'] });

interface FunFact {
  id: number;
  username: string;
  userId: number;
  factText: string;
  createdAt: string;
  updatedAt: string;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  console.log('hello world');

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <NavbarSimple />
          <FunFactGlobal>{children}</FunFactGlobal>
        </ThemeProvider>
      </body>
    </html>
  );
}
