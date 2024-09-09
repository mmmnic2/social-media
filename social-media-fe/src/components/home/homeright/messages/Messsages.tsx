import React from "react";
import AvatarWithInfo from "@/components/common/avatarWithInfo/AvatarWithInfo";

const Messsages = () => {
  return (
    <div className="bg-white rounded-xl p-4">
      {/* ---------HEADING------------ */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold">Messages</h4>
        <i className="uil uil-edit text-xl cursor-pointer"></i>
      </div>
      {/* ---------SEARCH BAR------------ */}
      <div className="flex mb-4 relative">
        <i className="uil uil-search text-xl mr-2 absolute right-0 top-1/2 -translate-y-1/2"></i>
        <input
          type="search"
          placeholder="Search messages"
          id="message-search"
          className="flex-grow p-2 border rounded-md outline-none"
        />
      </div>
      <div className="flex justify-between mb-4 cursor-pointer">
        <h6 className="w-full text-center border-b-4 border-dark pb-2 text-xs font-medium">
          Primary
        </h6>
        <h6 className="w-full text-center border-b-4 border-gray-200 pb-2 text-xs font-medium">
          General
        </h6>
        <h6 className="w-full text-center border-b-4 border-gray-200 pb-2 text-xs font-medium text-primary">
          Requests(2)
        </h6>
      </div>
      {/* -----------Messages----------- */}
      <div className="flex gap-4 mb-4 items-start">
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
