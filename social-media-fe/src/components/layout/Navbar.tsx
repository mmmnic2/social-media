import React from "react";

const Navbar = () => {
  return (
    <nav>
      <div className="container">
        <h2 className="log">LanSocial</h2>
        <div className="search-bar">
          <i className="uil uil-search"></i>
          <input type="search" placeholder="Search for creators" />
        </div>
        <div className="create">
          <label className="btn btn-primary" htmlFor="create-post">
            Create
          </label>
          <div className="profile-photo">
            <img
              src="https://mtv.vn/uploads/2023/02/25/meo-gg.jpg"
              alt="avatar"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
