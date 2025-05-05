import axios from "@/constant/axiosClient";

export interface NotificationPayload {
  senderId: number | null;
  receiverId: number | null;
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

export async function markAsReadNoti(notiId: number) {
  const url = `/api/v1/notification/read/${notiId}`;
  const res = await axios.put(url);
  return res.data;
}
