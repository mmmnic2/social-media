import axios from "@/constant/apiConstant";
import { NotificationType } from "@/redux/notifications/state";

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

export async function getAllNotiByUser(userId: number) {
  const url = `/api/v1/notification/get-all-by-receiver/${userId}`;
  const res = await axios.get(url);
  return res.data;
}
