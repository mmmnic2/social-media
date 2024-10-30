import { useMutation, useQuery } from "react-query";
import { getAllNotiByUser, sendNotification } from "@/api/notification";

export const useSendNotification = () => {
  return useMutation(sendNotification);
};

export const useGetNotification = (userId: number) => {
  return useQuery("get-all-noti", () => getAllNotiByUser(userId));
};
