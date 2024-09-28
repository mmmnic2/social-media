"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import axios from "@/constant/apiConstant";
import SocialAvatar from "../common/avatar/SocialAvatar";
import SearchBar from "../common/searchBar/SearchBar";
import CreatePostModal from "../post/CreatePostModal";

const Navbar = ({ isLogin }: { isLogin: boolean }) => {
  const [openModal, setOpenModal] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<
    React.ReactNode[]
  >([]);
  const router = useRouter();
  const handleSearch = async (query: string) => {
    if (query.trim() === "") {
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
          <div className="flex items-center gap-2 pb-2" key={suggestion.id}>
            <SocialAvatar imgUrl={""} alt={suggestion.firstName} />
            <span>
              {suggestion.firstName} {suggestion.lastName}{" "}
            </span>
          </div>
        ));
      setFilteredSuggestions(filtered);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };
  const handleSuggestionClick = (suggestion: any) => {
    router.replace(`/profile/${suggestion.key}`);
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
