import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "../styles/globals.css";
import Providers from "@/components/layout/Providers";
import "@fortawesome/fontawesome-free/css/all.min.css";

const nunito = Nunito({ subsets: ['vietnamese', 'latin'], weight: ['600', '700', '800']});

export const metadata: Metadata = {
  title: "Social Media",
  description: "This is social media project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
