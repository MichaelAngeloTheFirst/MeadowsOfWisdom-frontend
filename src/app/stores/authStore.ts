import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type AuthStore = {
  accessToken?: string;
  setAccessToken: (accessToken: string) => void;
  refreshToken?: string;
  setRefreshToken: (refreshToken: string) => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      setAccessToken: (accessToken: string) => set({ accessToken }),
      setRefreshToken: (refreshToken: string) => set({ refreshToken }),
    }),
    {
      name: "authStorage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ refreshToken: state.refreshToken }),
    },
  ),
);
