"use client";
import "@/styles/login.css";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
const AuthLayout = ({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) => {
  const currentPath = usePathname();
  const [bulletValue, setBulletValue] = useState({
    bullet1: "active",
    bullet2: "",
    bullet3: "",
  });
  const [translateValue, setTranslateValue] = useState("translateY(0)");
  const [currentIndex, setCurrentIndex] = useState(0);
  // const autoSlideInterval = () => {
  //   setInterval();
  // };
  // useEffect(() => {
  //   const autoSlideInterval = setInterval(() => {
  //     setCurrentIndex((prevIndex) => prevIndex + 1);
  //   }, 5000);

  //   return () => clearInterval(autoSlideInterval);
  // }, []);

  const handleClick = (e: any) => {
    const value = -(e.target.getAttribute("data-value") - 1) * 2.2;
    const dataValue = "bullet" + e.target.getAttribute("data-value");
    const initualValue = {
      bullet1: "",
      bullet2: "",
      bullet3: "",
    };
    setBulletValue({
      ...initualValue,
      [dataValue]: "active",
    });
    setTranslateValue(`translateY(${value}rem)`);
  };
  return (
    <main className={currentPath === "/register" ? "sign-up-mode" : ""}>
      <div className="box">
        <div className="inner-box">
          <div className="forms-wrap">{children}</div>

          <div className="carousel">
            <div className="images-wrapper">
              <img
                src="./image/image1.png"
                alt="image1"
                className={`image img-1 ${bulletValue.bullet1 ? "show" : ""}`}
              />
              <img
                src="./image/image2.png"
                alt="image2"
                className={`image img-2 ${bulletValue.bullet2 ? "show" : ""}`}
              />
              <img
                src="./image/image3.png"
                alt="image3"
                className={`image img-3 ${bulletValue.bullet3 ? "show" : ""}`}
              />
            </div>
            <div className="text-slider">
              <div className="text-wrap">
                <div
                  className="text-group"
                  style={{ transform: translateValue }}
                >
                  <h2>Create your own social media</h2>
                  <h2>Freedom</h2>
                  <h2>Invite your friend to join</h2>
                </div>
              </div>
              <div className="bullets">
                <span
                  onClick={handleClick}
                  className={bulletValue.bullet1}
                  data-value="1"
                ></span>
                <span
                  onClick={handleClick}
                  className={bulletValue.bullet2}
                  data-value="2"
                ></span>
                <span
                  onClick={handleClick}
                  className={bulletValue.bullet3}
                  data-value="3"
                ></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
