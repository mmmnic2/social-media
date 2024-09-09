"use client";
import Image from "next/image";
import React, { useState } from "react";
import CreatePostModal from "../post/CreatePostModal";

const Navbar = ({ isLogin }: { isLogin: boolean }) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <nav
        className={`w-full bg-white py-2.5 fixed ${(!isLogin && "top-12") || "top-0"} left-0 z-10000 shadow`}
      >
        <div className="max-w-[80%] mx-auto flex justify-between items-center">
          <h2 className="font-bold text-2xl">Lan Social</h2>
          <div className="search-bar border border-primary rounded-lg py-1 px-2 flex items-center min-w-52">
            <i className="uil uil-search text-text-primary"></i>
            <input
              type="search"
              placeholder="Search for creators"
              className="bg-transparent ml-4 w-full text-text-primary placeholder:text-text-primary text-sm"
              disabled={!isLogin}
            />
          </div>
          <div className="create flex items-center gap-8">
            <button
              className={` cursor-pointer py-2 px-4 rounded-lg text-light hover:bg-primary ${!isLogin ? "disabled:bg-gray cursor-not-allowed" : "bg-accent-color"}`}
              onClick={() => setOpenModal(true)}
              disabled={!isLogin}
            >
              Create Post
            </button>
            <div className="profile-photo">
              <Image
                src="https://mtv.vn/uploads/2023/02/25/meo-gg.jpg"
                alt="avatar"
                className="w-10 h-10 rounded-full object-cover"
                width={40}
                height={40}
              />
            </div>
          </div>
        </div>
      </nav>
      <CreatePostModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
      />
    </>
  );
};

export default Navbar;
