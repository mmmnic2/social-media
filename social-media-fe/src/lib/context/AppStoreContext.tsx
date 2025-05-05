"use client";
import { createContext, useContext } from "react";
import { StoreApi } from "zustand";
import { AuthState } from "../store/authStore";
import { NotificationState } from "../store/notificationStore";
import { UserState } from "../store/userStore";

export type AppStores = {
  userStore: StoreApi<UserState>;
  notificationStore: StoreApi<NotificationState>;
  authStore: StoreApi<AuthState>;
};

export const AppStoreContext = createContext<AppStores | null>(null);

export const useAppStores = () => {
  const ctx = useContext(AppStoreContext);
  if (!ctx) throw new Error("Missing AppStoreContext");
  return ctx;
};
