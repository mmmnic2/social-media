import SocialAvatar from "@/components/common/avatar/SocialAvatar";
import React from "react";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

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
  const settings = {
    // dots: false,
    infinite: false,
    // speed: 500,
    // slidesToShow: 4,
    // slidesToScroll: 1,
    // adaptiveHeight: true,
  };
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    }
  };

  return (
    <div className="stories">
    <Carousel responsive={responsive} {...settings} itemClass="carousel-item-padding">
      <div className="create-story-card">
        <div className="create-story-card img">
        <SocialAvatar imgUrl="abc" alt="Lan Lan" width="100%" height="100%"/>
        </div>
        <p className="create-story-card title">
          <AddCircleOutlineIcon />
          <span>Create story</span>
        </p>
      </div>
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
      </Carousel>
    </div>
  );
};

export default Stories;
