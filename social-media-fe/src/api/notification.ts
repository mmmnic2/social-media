import axios from "@/constant/apiConstant";

export enum NotificationType {
  "FRIEND_REQUEST" = "FRIEND_REQUEST",
  "TAG" = "TAG",
  "LIKE_POST" = "LIKE_POST",
  "COMMENT" = "COMMENT",
  "MESSAGE" = "MESSAGE",
}

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
