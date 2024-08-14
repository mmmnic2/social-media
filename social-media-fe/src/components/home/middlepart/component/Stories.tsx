import React from "react";
const stories = [
  {
    videoURl: "public/image/image1.png",
    username: "Your Story",
  },
  {
    videoURl: "public/image/image1.png",
    username: "Your Story",
  },
  {
    videoURl: "public/image/image1.png",
    username: "Your Story",
  },
  {
    videoURl: "public/image/image1.png",
    username: "Your Story",
  },
  {
    videoURl: "public/image/image1.png",
    username: "Your Story",
  },
];
const Stories = () => {
  return (
    <div className="stories">
      {stories.map((story, i) => (
        <div key={i} className="story">
          <div className="profile-photo">
            <img src={story.videoURl} alt="" />
          </div>
          <p className="name">{story.username}</p>
        </div>
      ))}
    </div>
  );
};

export default Stories;
