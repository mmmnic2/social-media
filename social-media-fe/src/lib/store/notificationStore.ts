import { createStore as vanillaCreateStore } from "zustand/vanilla";
import { Notification } from "@/types/notificationTypes";

export type NotificationState = {
  notifications: Notification[] | [];
  setNotifications: (notifications: Notification[]) => void;
  clearNotifications: () => void;
};

export const createNotificationStore = (initial?: Partial<NotificationState>) =>
  vanillaCreateStore<NotificationState>((set) => ({
    notifications: initial?.notifications ?? [],
    setNotifications: (notifications) => set({ notifications }),
    clearNotifications: () => set({ notifications: [] }),
  }));
