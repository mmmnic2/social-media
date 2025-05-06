"use client";
import { useRef } from "react";
import { AppStoreContext } from "@/lib/context/AppStoreContext";
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
  const postsStore = useRef(createPostStore({ posts: initialUser }));

  return (
    <AppStoreContext.Provider
      value={{
        userStore: userStore.current,
        postsStore: postsStore.current,
      }}
    >
      {children}
    </AppStoreContext.Provider>
  );
}
