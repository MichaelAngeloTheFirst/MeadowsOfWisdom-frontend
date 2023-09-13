"use client";
import { ThemeProvider } from "@material-tailwind/react";
import { SimpleCard } from "./components/SimpleCard";

export default function Login() {
  return (
    <main>
      <ThemeProvider>
        <SimpleCard />
      </ThemeProvider>

    </main>
  );
}
