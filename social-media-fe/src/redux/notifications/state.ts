import { Notification } from "@/types/notificationTypes";

interface InitialNotification {
  allNotifications: Notification[];
}

export const initialState: InitialNotification = {
  allNotifications: [],
};
