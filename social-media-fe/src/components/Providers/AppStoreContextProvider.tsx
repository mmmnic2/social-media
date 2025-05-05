"use client";
import { useRef } from "react";
import { AppStoreContext } from "@/lib/context/AppStoreContext";
import { createUserStore } from "@/lib/store/userStore";

export default function AppStoreContextProvider({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser: any;
}) {
  const userStore = useRef(createUserStore({ user: initialUser }));

  return (
    <AppStoreContext.Provider
      value={{
        userStore: userStore.current,
      }}
    >
      {children}
    </AppStoreContext.Provider>
  );
}
