import React from "react";

const NavbarV2 = () => {
  return (
    <nav className="w-full bg-white py-2.5 fixed top-0 z-10000">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h2 className="font-bold text-2xl">LanSocial</h2>
        <div className="search-bar bg-light rounded-lg py-1 px-2 flex items-center">
          <i className="uil uil-search text-gray-500"></i>
          <input
            type="search"
            placeholder="Search for creators"
            className="bg-transparent ml-4 w-1/3 text-dark-gray placeholder-gray text-sm"
          />
        </div>
        <div className="create flex items-center gap-8">
          <label
            className="btn btn-primary cursor-pointer"
            htmlFor="create-post"
          >
            Create
          </label>
          <div className="profile-photo">
            <img
              src="https://mtv.vn/uploads/2023/02/25/meo-gg.jpg"
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarV2;
