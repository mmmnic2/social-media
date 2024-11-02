import { User } from "./userTypes";

export interface Notification {
  notificationId: number;
  sender: User;
  read: boolean;
  receiver: User;
  type: NotificationType;
  message: string;
  createDate: string;
  modifiedDate: string;
}
