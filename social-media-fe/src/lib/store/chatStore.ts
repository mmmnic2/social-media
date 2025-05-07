import { createStore as vanillaCreateStore } from "zustand/vanilla";

export type ChatState = {
  allChats: any[];
  selectedChat: any;
  allMessages: any[];
  setSelectedChat: (chat: number) => void;
  setAllChats: (chats: any[]) => void;
  setMessage: (message: any) => void;
  setAllMessages: (message: any) => void;
  clearSelectedChat: () => void;
};

export const createChatStore = (initial?: Partial<ChatState>) =>
  vanillaCreateStore<ChatState>((set) => ({
    allChats: initial?.allChats ?? [],
    selectedChat: initial?.selectedChat ?? {},
    allMessages: initial?.allMessages ?? [],
    setSelectedChat: (chat) => set({ selectedChat: chat }),
    setAllChats: (chats) => set({ allChats: chats }),
    setAllMessages: (messages) => set({ allMessages: messages }),
    setMessage: (message) =>
      set((state) => ({ allMessages: [...state.allMessages, message] })),
    clearSelectedChat: () => set({ selectedChat: {} }),
  }));
