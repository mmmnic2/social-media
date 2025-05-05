import { useStore } from "zustand";
import { AuthState, authStore } from "@/lib/store/authStore";

export const useAuthStore = <T>(selector: (state: AuthState) => T) =>
  useStore(authStore, selector);
