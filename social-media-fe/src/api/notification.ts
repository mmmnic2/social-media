import axios from "@/constant/apiConstant";
<<<<<<< HEAD
import { NotificationType } from "@/redux/notifications/state";
=======

export enum NotificationType {
  "FRIEND_REQUEST" = "FRIEND_REQUEST",
  "TAG" = "TAG",
  "LIKE_POST" = "LIKE_POST",
  "COMMENT" = "COMMENT",
  "MESSAGE" = "MESSAGE",
}
>>>>>>> bafd83053ca00c1caba8db8f7bfed30938770268

export interface NotificationPayload {
  senderId: number;
  receiverId: number;
  notificationType: NotificationType;
}

export async function sendNotification(payload: NotificationPayload) {
  const url = `/api/v1/notification/notify`;
  const res = await axios.post(url, payload);
  return res.data;
}
<<<<<<< HEAD

export async function getAllNotiByUser(userId: number) {
  const url = `/api/v1/notification/get-all-by-receiver/${userId}`;
  const res = await axios.get(url);
  return res.data;
}
=======
>>>>>>> bafd83053ca00c1caba8db8f7bfed30938770268
