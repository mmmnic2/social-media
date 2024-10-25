import { useMutation } from "react-query";
import { sendNotification } from "@/api/notification";

export const useSendNotification = () => {
  return useMutation(sendNotification);
};
