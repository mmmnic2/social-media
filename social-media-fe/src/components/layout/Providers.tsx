"use client";
import { usePathname, useRouter } from "next/navigation";
import store, { persistor } from "@/redux/store";
import { useEffect } from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ReactQueryDevtools } from "react-query/devtools";
import { createTheme, ThemeProvider } from "@mui/material";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  const router = useRouter();
  const currentPath = usePathname();
  // const checkIsLogin = (expireIn: number | null) => {
  //   return expireIn != null && expireIn != undefined && expireIn > Date.now();
  // };
  const checkIsLogin = (expireIn: number | null) => {
    return expireIn != null && expireIn != undefined && expireIn > Date.now();
  };
  let isLogin = checkIsLogin(store.getState()?.auth.expireTime);

  useEffect(() => {
    if (!isLogin && currentPath != "/login" && currentPath != "/register") {
      router.push("/login");
    } else if (isLogin && currentPath == "/login") {
      router.push("/");
    }
  }, [isLogin, currentPath, router]);
  return (
    // <ThemeProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    // </ThemeProvider>
  );
};

export default Providers;
