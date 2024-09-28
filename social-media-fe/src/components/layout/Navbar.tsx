"use client";
import Image from "next/image";
import React, { useState } from "react";
import axios from "@/constant/apiConstant";
import SearchBar from "../common/searchBar/SearchBar";
import CreatePostModal from "../post/CreatePostModal";

const Navbar = ({ isLogin }: { isLogin: boolean }) => {
  const [openModal, setOpenModal] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<
    React.ReactNode[]
  >([]);
  console.log(filteredSuggestions);
  const handleSearch = async (query: string) => {
    console.log(query);
    if (query.trim() === "") {
      console.log("here");
      setFilteredSuggestions([]);
      return;
    }
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/all-user`,
      );
      const filtered = response.data
        .filter((suggestion: any) =>
          suggestion.firstName.toLowerCase().includes(query.toLowerCase()),
        )
        .map((suggestion: any) => (
          <div className="border-b-[1px]" key={suggestion.id}>
            {suggestion.firstName}
          </div>
        ));
      console.log(filtered);
      setFilteredSuggestions(filtered);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };
  const handleSuggestionClick = (suggestion: any) => {
    console.log("Selected suggestion:", suggestion.key);
  };
  return (
    <>
      <nav
        className={`w-full bg-white py-2.5 fixed ${(!isLogin && "top-12") || "top-0"} left-0 z-10000 shadow`}
      >
        <div className="max-w-[80%] mx-auto flex justify-between items-center">
          <h2 className="font-bold text-2xl">Lan Social</h2>
          <SearchBar
            onSearch={handleSearch}
            suggestions={filteredSuggestions}
            onSuggestionClick={handleSuggestionClick}
            debounceTime={500}
            placeholder="Search for creators"
            disabled={!isLogin}
          />
          <div className="create flex items-center gap-8">
            <button
              className={`py-2 px-4 rounded-lg text-light hover:bg-primary ${!isLogin ? "disabled:bg-gray cursor-not-allowed" : "bg-accent-color cursor-pointer"}`}
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
