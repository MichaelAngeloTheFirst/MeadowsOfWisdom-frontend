"use client";
import { ThemeProvider } from "@material-tailwind/react";
import { SimpleLoginForm } from "./components/SimpleLoginForm";

export default function Login() {
  return (
    <main>
      <ThemeProvider>
        <SimpleLoginForm />
      </ThemeProvider>
    </main>
  );
}
