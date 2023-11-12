'use client';
import { ThemeProvider } from '@material-tailwind/react';
import { SimpleCard } from './components/SimpleCard';

export default function Meadows() {
  return (
    <main className="flex min-h-0 w-full flex-grow justify-center">
      <SimpleCard />
    </main>
  );
}
