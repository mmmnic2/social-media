import { createSelector } from "@reduxjs/toolkit";

export const allChatsSelector = createSelector(
  (state) => state.chat?.allChats,
  (allChats) => allChats
);

export const chatSelectedSelector = createSelector(
  (state) => state.chat?.chatSelected,
  (chatSelected) => chatSelected
);

export const getChatByIdSelector = createSelector(
  (state, chatId) =>
    state.chat?.allChats?.find((chat: any) => chat.chatId === chatId),
  (foundChat) => foundChat
);
