"use client";
import { createContext, useContext } from "react";
import { StoreApi } from "zustand";
import { ChatState } from "../store/chatStore";
import { NotificationState } from "../store/notificationStore";
import { PostState } from "../store/postStore";
import { UserState } from "../store/userStore";

export type AppStores = {
  userStore: StoreApi<UserState>;
  postsStore: StoreApi<PostState>;
  chatStore: StoreApi<ChatState>;
  notificationStore: StoreApi<NotificationState>;
};

export const AppStoreContext = createContext<AppStores | null>(null);

export const useAppStores = () => {
  const ctx = useContext(AppStoreContext);
  if (!ctx) throw new Error("Missing AppStoreContext");
  return ctx;
};
