import React from "react";
import AvatarWithInfo from "@/components/common/avatarWithInfo/AvatarWithInfo";

const Messsages = () => {
  return (
    <div className="messages">
      {/* ---------HEADING------------ */}
      <div className="heading">
        <h4>Messages</h4>
        <i className="uil uil-edit"></i>
      </div>
      {/* ---------SEARCH BAR------------ */}
      <div className="search-bar">
        <i className="uil uil-search"></i>
        <input
          type="search"
          placeholder="Search messages"
          id="message-search"
        />
      </div>
      <div className="category">
        <h6 className="active">Primary</h6>
        <h6>General</h6>
        <h6 className="message-requests">Requests(2)</h6>
      </div>
      {/* -----------Messages----------- */}
      <div className="message">
        <AvatarWithInfo
          imgUrl="abac"
          alt="Lan Lan"
          title="Lan Lan"
          subtitle="How are you?"
          status="online"
        />
      </div>
    </div>
  );
};

export default Messsages;
