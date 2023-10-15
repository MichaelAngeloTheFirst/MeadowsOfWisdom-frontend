"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, type ReactNode, use } from "react";
import { useAuthStore } from "@/app/stores/authStore";
import useStore from "./stores/useStore";

export function ProtectedRouter({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { refreshToken } = useStore(useAuthStore, (state) => state) ?? {
    refreshToken: undefined,
  };
  const userAuthenticated = refreshToken ? true : false;

  useEffect(() => {
    let timeOutHandle: ReturnType<typeof setTimeout>;

    if (!userAuthenticated) {
      timeOutHandle = setTimeout(() => {
        router.push("/login");
      }, 1000);
    }

    return () => {
      clearTimeout(timeOutHandle);
    };
  });

  if (!userAuthenticated) {
    return <div>Redirecting</div>;
  }

  return <>{children}</>;
}
