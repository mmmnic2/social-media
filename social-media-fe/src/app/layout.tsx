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

const nunito = Nunito({
  subsets: ["vietnamese", "latin"],
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Social Media",
  description: "This is social media project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = cookies().get("sessionToken");
  console.log(token);
  return (
    <html lang="en">
      <body className={nunito.className}>
        <Providers>
          <SnackbarProvider>
            <StomClientProvider token={token}>{children}</StomClientProvider>
          </SnackbarProvider>
        </Providers>
      </body>
    </html>
  );
}
