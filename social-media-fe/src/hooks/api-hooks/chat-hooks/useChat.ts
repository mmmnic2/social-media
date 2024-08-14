import { useMutation, useQuery } from "react-query";
import { createChat, getChatById, getChatsByUser } from "@/api/chat";
export const useCreateChat = () => {
  return useMutation(createChat);
};

export const useGetChatById = (chatId: number) => {
  return useQuery(["chat", chatId], () => getChatById(chatId));
};

export const useGetChatsByUser = () => {
  return useQuery("chat_user", getChatsByUser);
};
