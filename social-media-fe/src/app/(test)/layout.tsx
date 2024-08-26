import "@/styles/main.css";
import { Metadata } from "next";
import HomeLeft from "@/components/home/homeleft/HomeLeft";
import HomeRightV2 from "@/components/home/homeright/HomeRightV2";
import Navbar from "@/components/layout/Navbar";
import NavbarV2 from "@/components/layout/NavbarV2";
import HomeLeftV2 from "@/components/home/homeleft/HomeLeftV2";

export const metadata: Metadata = {
  title: "Social Media | Home",
  description: "This is social media homepage",
};

const TestLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="bg-background">
      <NavbarV2 />
      <div className="container">
        <HomeLeftV2 />
        <div className="middle mt-4">{children}</div>
        <HomeRightV2 />
      </div>
    </main>
  );
};

export default TestLayout;
