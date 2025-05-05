import { useMutation, useQuery } from "@tanstack/react-query";
import { createChat, getChatById, getChatsByUser } from "@/api/chat";
export const useCreateChat = () => {
  return useMutation({
    mutationFn: createChat,
  });
};

export const useGetChatById = (chatId: number) => {
  return useQuery({
    queryKey: ["chat", chatId],
    queryFn: () => getChatById(chatId),
  });
};

export const useGetChatsByUser = () => {
  return useQuery({
    queryKey: ["chat_user"],
    queryFn: getChatsByUser,
  });
};
