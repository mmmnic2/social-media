import { Avatar } from "@mui/material";
import React from "react";

const AvatarSocial = ({
  title,
  subtitle,
  imgUrl,
}: {
  title: string;
  subtitle: string;
  imgUrl: string;
}) => {
  return (
    <div className="flex items-center space-x-3">
      <Avatar src="https://png.pngtree.com/png-clipart/20210608/ourlarge/pngtree-dark-gray-simple-avatar-png-image_3418404.jpg" />
      <div>
        <p className="font-bold">{title}</p>
        <p className="opacity-70">{subtitle}</p>
      </div>
    </div>
  );
};

export default AvatarSocial;
