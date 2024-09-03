"use client";
import { createTheme, ThemeProvider } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "@/redux/store";

const theme = createTheme({
  palette: {
    primary: {
      main: "#e0a2a2",
    },
    secondary: {
      main: "#edb9b8",
    },
    error: {
      main: "hsl(0, 95%, 65%)",
    },
  },
});

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
  // console.log({ isLogin });

  // useEffect(() => {
  //   if (!isLogin && currentPath != "/login" && currentPath != "/register") {
  //     router.push("/login");
  //   } else if (isLogin && currentPath == "/login") {
  //     router.push("/test");
  //   }
  // }, [isLogin, currentPath, router]);
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {children}
          </PersistGate>
        </Provider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default Providers;
