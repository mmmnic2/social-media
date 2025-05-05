// import "@/styles/main.css";
import { Metadata } from "next";
import { cookies } from "next/headers";
import WarningBanner from "@/components/common/warningBanner/warningBanner";
import HomeRightV2 from "@/components/home/homeright/HomeRightV2";
import HomeLeft from "@/components/layout/home-left/HomeLeft";
import Navbar from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "Social Media | Home",
  description: "This is social media homepage",
};

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const token = (await cookies()).get("sessionToken");
  return (
    <main className="bg-light-background min-h-screen">
      <WarningBanner isLogin={!!token} />
      <Navbar isLogin={!!token} />
      <div
        className={`max-w-[80%] mx-auto flex gap-4 ${!!token ? "mt-[60px]" : "mt-[108px]"}`}
      >
        <HomeLeft isLogin={!!token} />
        <div className="middle mt-4 flex-1 ">{children}</div>
        <HomeRightV2 isLogin={!!token} />
      </div>
    </main>
  );
};

export default MainLayout;
