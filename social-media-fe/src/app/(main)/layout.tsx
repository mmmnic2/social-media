// import "@/styles/main.css";
import { Metadata } from "next";
import { cookies } from "next/headers";
import WarningBanner from "@/components/common/warningBanner/warningBanner";
import HomeLeftV2 from "@/components/home/homeleft/HomeLeftV2";
import HomeRightV2 from "@/components/home/homeright/HomeRightV2";
import Navbar from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "Social Media | Home",
  description: "This is social media homepage",
};

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const token = cookies().get("sessionToken");
  return (
    <main className="bg-light-background">
      {!token && (
        <div className="fixed z-10000 top-0 w-full">
          <WarningBanner />
        </div>
      )}
      <Navbar isLogin={!!token} />
      <div
        className={`max-w-[80%] mx-auto flex gap-4 ${!!token ? "mt-[60px]" : "mt-[108px]"}`}
      >
        <HomeLeftV2 isLogin={!!token} />
        <div className="middle mt-4 flex-1 ">{children}</div>
        <HomeRightV2 />
      </div>
    </main>
  );
};

export default MainLayout;
