import Image from "next/image";
import React from "react";

const ProfilePage = ({ params }: { params: { slug: string } }) => {
  console.log(params);
  return (
    <div>
      {/* <div>
        <div
          className="relative w-full h-96 bg-cover bg-center"
          style={{ backgroundImage: "url('/image/cat_bg.jpg')" }}
        >
          <div
            className="absolute inset-0 bg-no-repeat bg-bottom"
            style={{ backgroundImage: "url('/image/wave.svg')" }}
          ></div>
        </div>
      </div> */}
      <div className="relative">
        <div className="w-full h-96">
          <Image
            src="/image/cat_bg.jpg"
            alt="Main Image"
            objectFit="cover"
            layout="fill"
            quality={100}
          />
        </div>
        <div className="absolute left-0 bottom-0 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#fdecea"
              fill-opacity="1"
              d="M0,160L48,144C96,128,192,96,288,74.7C384,53,480,43,576,80C672,117,768,203,864,240C960,277,1056,267,1152,240C1248,213,1344,171,1392,149.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
