import SocialAvatar from "@/components/common/avatar/SocialAvatar";
import React from "react";
const stories = [
  {
    videoURl: "/image/image1.png",
    username: "Your Story",
  },
  {
    videoURl: "/image/image1.png",
    username: "Your Story",
  },
  {
    videoURl: "/image/image1.png",
    username: "Your Story",
  },
  {
    videoURl: "/image/image1.png",
    username: "Your Story",
  },
  {
    videoURl: "/image/image1.png",
    username: "Your Story",
  },
];
const Stories = () => {
  return (
    <div className="stories">
      {stories.map((story, i) => (
        <div key={i} className="story">
          <div className="profile-photo">
            <SocialAvatar
              width="100%"
              height="100%"
              imgUrl="abc"
              alt="Lan Lan"
            />
          </div>
          <p className="name">{story.username}</p>
        </div>
      ))}
    </div>
  );
};

export default Stories;
