import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getAllNotiByUser,
  markAsReadNoti,
  sendNotification,
} from "@/api/notification";

export const useSendNotification = () => {
  return useMutation({
    mutationFn: sendNotification,
  });
};

export const useGetNotification = (userId: number, token: string) => {
  return useQuery({
    queryKey: ["get-all-noti"],
    queryFn: () => getAllNotiByUser(userId),
    enabled: !!token,
  });
};

export const useMarkAsReadNoti = () => {
  return useMutation({
    mutationFn: markAsReadNoti,
  });
};
