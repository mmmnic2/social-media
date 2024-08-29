import React from "react";
import Messsages from "./messages/Messsages";
import FriendRequests from "./requests/FriendRequest";

const HomeRightV2 = () => {
  return (
    <div className="right mt-4 basis-1/4">
      <Messsages />
      <FriendRequests />
    </div>
  );
};

export default HomeRightV2;
