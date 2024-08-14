import "@/styles/main.css";
import HomeLeft from "@/components/home/homeleft/HomeLeft";
import HomeRightV2 from "@/components/home/homeright/HomeRightV2";
import Navbar from "@/components/layout/Navbar";
const TestLayout = ({
  children, // will be a page or nested layout
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
