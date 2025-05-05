/* eslint-disable import/order */
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "../styles/globals.css";
import Providers from "@/components/layout/Providers";
import "@fortawesome/fontawesome-free/css/all.min.css";
// eslint-disable-next-line import/order
import { SnackbarProvider } from "@/components/common/snackbar/Snackbar";
import { StomClientProvider } from "@/components/layout/StomClientProvider";
import { cookies } from "next/headers";
import AppStoreContextProvider from "@/components/Providers/AppStoreContextProvider";
import { createServerAxios } from "@/constant/axiosServer";

const nunito = Nunito({
  subsets: ["vietnamese", "latin"],
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Social Media",
  description: "This is social media project",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = (await cookies()).get("sessionToken")?.value || "";
  const axios = createServerAxios(token || "");
  const user = token ? (await axios.get("/api/v1/user/profile")).data : null;
  return (
    <html lang="en">
      <body className={nunito.className}>
        <AppStoreContextProvider initialUser={user}>
          <Providers>
            <SnackbarProvider>
              <StomClientProvider token={token}>{children}</StomClientProvider>
            </SnackbarProvider>
          </Providers>
        </AppStoreContextProvider>
      </body>
    </html>
  );
}
