import { useMutation, useQuery } from "@tanstack/react-query";
import { createMessage, getMessageByChatId } from "@/api/message";

export const useCreateMessage = () => {
  return useMutation({
    mutationFn: createMessage,
  });
};

export const useGetMessageByChat = (chatId: number) => {
  return useQuery({
    queryKey: ["message", chatId],
    queryFn: () => getMessageByChatId(chatId),
  });
};
