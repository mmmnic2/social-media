/* eslint-disable @next/next/no-img-element */
"use client";
// import "@/styles/login.css";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Image1 from "../../../public/image/image1.png";
import Image2 from "../../../public/image/image2.png";
import Image3 from "../../../public/image/image3.png";

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

  const handleClick = (e: any) => {
    const value = -(e.target.getAttribute("data-value") - 1) * 2.2;
    const dataValue = "bullet" + e.target.getAttribute("data-value");
    const initialValue = {
      bullet1: "",
      bullet2: "",
      bullet3: "",
    };
    setBulletValue({
      ...initialValue,
      [dataValue]: "active",
    });
    setTranslateValue(`translateY(${value}rem)`);
  };

  return (
    <main
      className={`w-full min-h-screen overflow-hidden bg-gradient-to-r from-primary to-secondary flex items-center justify-center p-8`}
    >
      <div className="relative w-full max-w-4xl h-[640px] bg-white bg-opacity-80 shadow-lg rounded-xl p-5">
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`absolute w-[45%] h-full grid ${currentPath === "/register" ? "right-0" : "left-0"} transition-all duration-700 ease-in-out`}
          >
            {children}
          </div>
          <div
            className={`absolute w-[55%] h-full bg-white rounded-tr-xl rounded-br-xl ${currentPath === "/register" ? "left-0" : "right-0"} grid grid-rows-[auto,1fr] p-8 overflow-hidden transition-all duration-700 ease-in-out`}
          >
            <div className="relative w-full h-[450px] overflow-hidden bg-background">
              <Image
                layout="fill"
                quality={100}
                src={Image1}
                alt="image1"
                className={`transition-opacity duration-300 ${bulletValue.bullet1 ? "opacity-100" : "opacity-0"}`}
              />
              <Image
                layout="fill"
                quality={100}
                src={Image2}
                alt="image2"
                className={`transition-opacity duration-300 ${bulletValue.bullet2 ? "opacity-100" : "opacity-0"}`}
              />
              <Image
                layout="fill"
                quality={100}
                src={Image3}
                alt="image3"
                className={`transition-opacity duration-300 ${bulletValue.bullet3 ? "opacity-100" : "opacity-0"}`}
              />
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="relative overflow-hidden max-h-[2.2rem] mb-10">
                <div
                  className="flex flex-col items-center justify-center transition-transform duration-500"
                  style={{ transform: translateValue }}
                >
                  <h2 className="text-2xl font-semibold">
                    Create your own social media
                  </h2>
                  <h2 className="text-2xl font-semibold">Freedom</h2>
                  <h2 className="text-2xl font-semibold">
                    Invite your friend to join
                  </h2>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-1">
                <span
                  onClick={handleClick}
                  className={`w-2.5 h-2.5 bg-gray-400 rounded-full cursor-pointer transition-all duration-300 ${bulletValue.bullet1 ? "w-4 h-4 bg-black" : "bg-gray"}`}
                  data-value="1"
                ></span>
                <span
                  onClick={handleClick}
                  className={`w-2.5 h-2.5 bg-gray-400 rounded-full cursor-pointer transition-all duration-300 ${bulletValue.bullet2 ? "w-4 h-4 bg-black" : "bg-gray"}`}
                  data-value="2"
                ></span>
                <span
                  onClick={handleClick}
                  className={`w-2.5 h-2.5 bg-gray-400 rounded-full cursor-pointer transition-all duration-300 ${bulletValue.bullet3 ? "w-4 h-4 bg-black" : "bg-gray"}`}
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
