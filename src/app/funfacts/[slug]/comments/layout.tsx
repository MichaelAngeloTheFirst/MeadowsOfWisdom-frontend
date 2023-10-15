"use client";
import { ProtectedRouter } from "@/app/ProtectedRouter";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <ProtectedRouter>{children}</ProtectedRouter>;
}