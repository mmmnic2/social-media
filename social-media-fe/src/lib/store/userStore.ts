import { createStore as vanillaCreateStore } from "zustand/vanilla";
import { User } from "@/types/userTypes";

export type UserState = {
  user: User | null;
  setUserInfo: (user: User) => void;
  clearUserInfo: () => void;
};

export const createUserStore = (initial?: Partial<UserState>) =>
  vanillaCreateStore<UserState>((set) => ({
    user: initial?.user ?? null,
    setUserInfo: (user) => set({ user }),
    clearUserInfo: () => set({ user: null }),
  }));
