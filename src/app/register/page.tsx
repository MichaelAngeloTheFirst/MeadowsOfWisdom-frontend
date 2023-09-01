"use client";
import { ThemeProvider } from "@material-tailwind/react";
import { SimpleRegisterForm } from "./components/SimpleRegisterForm";

export default function Register() {
  return (
    <main>
      <ThemeProvider>
        <SimpleRegisterForm />
      </ThemeProvider>
    </main>
  );
}
