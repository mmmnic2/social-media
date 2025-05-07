"use client";
import { useRef } from "react";
import { AppStoreContext } from "@/lib/context/AppStoreContext";
import { createChatStore } from "@/lib/store/chatStore";
import { createPostStore } from "@/lib/store/postStore";
import { createUserStore } from "@/lib/store/userStore";

export default function AppStoreContextProvider({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser: any;
}) {
  const userStore = useRef(createUserStore({ user: initialUser }));
  const postsStore = useRef(createPostStore({}));
  const chatStore = useRef(createChatStore({}));

  return (
    <AppStoreContext.Provider
      value={{
        userStore: userStore.current,
        postsStore: postsStore.current,
        chatStore: chatStore.current,
      }}
    >
      {children}
    </AppStoreContext.Provider>
  );
}
