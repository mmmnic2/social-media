// import "@/styles/main.css";
import { Metadata } from "next";
import WarningBanner from "@/components/common/warningBanner/warningBanner";
import HomeLeftV2 from "@/components/home/homeleft/HomeLeftV2";
import HomeRightV2 from "@/components/home/homeright/HomeRightV2";
import NavbarV2 from "@/components/layout/NavbarV2";

export const metadata: Metadata = {
  title: "Social Media | Home",
  description: "This is social media homepage",
};

const TestLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="bg-light-background">
      <div className="fixed z-10000 top-0 w-full">
        <WarningBanner />
      </div>
      <NavbarV2 />
      <div className="max-w-[80%] mx-auto flex gap-4 mt-[110px]">
        <HomeLeftV2 />
        <div className="middle mt-4 flex-1 ">{children}</div>
        <HomeRightV2 />
      </div>
    </main>
  );
};

export default TestLayout;
