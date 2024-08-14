import React from "react";

const UserReelCard = () => {
  return (
    <div className="w-[15rem] m-4">
      <video
        className="w-full h-full rounded-lg"
        controls
        src="https://videos.pexels.com/video-files/20351897/20351897-hd_1080_1920_30fps.mp4"
      />
    </div>
  );
};

export default UserReelCard;
