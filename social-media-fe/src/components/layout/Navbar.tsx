"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "@/constant/apiConstant";
import { RootState } from "@/redux/store";
import { User } from "@/types/userTypes";
import SocialAvatar from "../common/avatar/SocialAvatar";
import SearchBar from "../common/searchBar/SearchBar";
import CreatePostModal from "../post/CreatePostModal";

const Navbar = ({ isLogin }: { isLogin: boolean }) => {
  const [openModal, setOpenModal] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<
    React.ReactNode[]
  >([]);
  const router = useRouter();
  const userInfo = useSelector((state: RootState) => state.user);
  const handleSearch = async (query: string) => {
    if (query.trim() === "") {
      setFilteredSuggestions([]);
      return;
    }
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}api/v1/user/all-user`,
      );
      const filtered = response.data
        .filter((suggestion: User) =>
          suggestion.firstName.toLowerCase().includes(query.toLowerCase()),
        )
        .map((suggestion: User) => (
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
          <h2
            className="font-bold text-2xl cursor-pointer"
            onClick={() => router.replace("/")}
          >
            Lan Social
          </h2>
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
              <SocialAvatar
                imgUrl={userInfo?.imageUrl ? userInfo.imageUrl : "/"}
                alt={userInfo?.firstName || "Lan Lan"}
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
