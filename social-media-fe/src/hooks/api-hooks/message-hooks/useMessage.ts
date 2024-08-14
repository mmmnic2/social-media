import { useMutation, useQuery } from "react-query";
import { createMessage, getMessageByChatId } from "@/api/message";

export const useCreateMessage = () => {
  return useMutation(createMessage);
};

export const useGetMessageByChat = (chatId: number) => {
  return useQuery(["message", chatId], () => getMessageByChatId(chatId));
};
