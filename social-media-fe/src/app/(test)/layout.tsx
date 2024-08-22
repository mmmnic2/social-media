import "@/styles/main.css";
import { Metadata } from "next";
import HomeLeft from "@/components/home/homeleft/HomeLeft";
import HomeRightV2 from "@/components/home/homeright/HomeRightV2";
import Navbar from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "Social Media | Home",
  description: "This is social media homepage",
};

const TestLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <Navbar />
      <div className="container">
        <HomeLeft />
        <div className="middle">{children}</div>
        <HomeRightV2 />
      </div>
    </main>
  );
};

export default TestLayout;
