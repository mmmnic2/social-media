import React from "react";
import Messsages from "./messages/Messsages";
import FriendRequests from "./requests/FriendRequest";

const HomeRightV2 = () => {
  return (
    <div className="right">
      <Messsages />
      <FriendRequests />
    </div>
  );
};

export default HomeRightV2;
