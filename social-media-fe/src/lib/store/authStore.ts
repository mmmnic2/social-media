import { persist } from "zustand/middleware";
import { createStore } from "zustand/vanilla";

export type AuthState = {
  accessToken: string | null;
  setAccessToken: (token: string) => void;
  clearAccessToken: () => void;
};

export const authStore = createStore(
  persist<AuthState>(
    (set) => ({
      accessToken: null,
      setAccessToken: (token) => set({ accessToken: token }),
      clearAccessToken: () => set({ accessToken: null }),
    }),
    {
      name: "auth-storage",
      partialize: (state): AuthState => ({
        accessToken: state.accessToken ?? null,
        setAccessToken: function (token: string): void {
          throw new Error("Function not implemented.");
        },
        clearAccessToken: function (): void {
          throw new Error("Function not implemented.");
        },
      }),
    },
  ),
);
