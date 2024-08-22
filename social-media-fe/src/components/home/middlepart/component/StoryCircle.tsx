import AddIcon from "@mui/icons-material/Add";
import { Avatar } from "@mui/material";
import React from "react";
const StoryCircle = () => {
  return (
    <div>
      <div className="flex flex-col items-center mr-4 cursor-pointer">
        <Avatar
          sx={{ width: "5rem", height: "5rem" }}
          src="https://www.hepper.com/wp-content/uploads/2023/02/silver-tabby-british-shorthair-cat_Nils-Jacobi-Shutterstock.jpg"
        >
          <AddIcon sx={{ fontSize: "3rem" }} />
        </Avatar>
        <p>Cat</p>
      </div>
    </div>
  );
};

export default StoryCircle;
