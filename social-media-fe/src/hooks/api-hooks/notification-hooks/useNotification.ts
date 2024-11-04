import { useMutation, useQuery } from "react-query";
import {
  getAllNotiByUser,
  markAsReadNoti,
  sendNotification,
} from "@/api/notification";
import { setAllNotifications } from "@/redux/notifications/notifications";
import store from "@/redux/store";

export const useSendNotification = () => {
  return useMutation(sendNotification);
};

export const useGetNotification = (userId: number) => {
  return useQuery("get-all-noti", () => getAllNotiByUser(userId), {
    onSuccess: (data) => {
      store.dispatch(setAllNotifications(data));
    },
  });
};

export const useMarkAsReadNoti = () => {
  return useMutation(markAsReadNoti);
};
