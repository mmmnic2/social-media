import "@/styles/main.css";
import HomeLeft from "@/components/home/homeleft/HomeLeft";
import HomeRightV2 from "@/components/home/homeright/HomeRightV2";
import Navbar from "@/components/layout/Navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Social Media | Home",
  description: "This is social media homepage",
};

const TestLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
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
