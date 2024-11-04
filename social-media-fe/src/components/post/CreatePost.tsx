import ArticleIcon from "@mui/icons-material/Article";
import ImageIcon from "@mui/icons-material/Image";
import VideocamIcon from "@mui/icons-material/Videocam";
import { Avatar, Card, IconButton } from "@mui/material";
import { useState } from "react";
import CreatePostModal from "./CreatePostModal";
const benefitList = [
  {
    title: "Media",
    icon: <ImageIcon />,
  },
  {
    title: "Video",
    icon: <VideocamIcon />,
  },
  {
    title: "Write Article",
    icon: <ArticleIcon />,
  },
];
const CreatePost = () => {
  const [open, setOpen] = useState(false);
  const handleOpenCreatePostModal = () => setOpen(true);
  const handleCloseCreatePostModal = () => setOpen(false);

  const handleCreatePost = () => {
    console.log("create post");
  };
  return (
    <>
      <Card className="p-5 mt-5 w-full">
        <div className="flex justify-between">
          <Avatar />
          <input
            onClick={handleOpenCreatePostModal}
            type="text"
            placeholder="What do you think?"
            className="outline-none w-[90%] bg-slate-100
            rounded-full px-5 bg-transparent border-[#3b4054] border"
          />
        </div>
        <div className="flex justify-center space-x-9 mt-5">
          {benefitList.map((item) => (
            <div key={item.title} className="flex items-center">
              <IconButton
                color="primary"
                sx={{ color: "primary.main", borderRadius: "10%" }}
                onClick={handleCreatePost}
              >
                {item.icon}
                <span className="text-sm text-black px-1">{item.title}</span>
              </IconButton>
            </div>
          ))}
        </div>
      </Card>
      <div>
        <CreatePostModal open={open} handleClose={handleCloseCreatePostModal} />
      </div>
    </>
  );
};

export default CreatePost;
