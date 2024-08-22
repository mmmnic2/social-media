"use client";

import Avatar, { AvatarProps } from "@mui/material/Avatar";
import Badge, { BadgeProps } from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import React from "react";

interface StyledBadgeProps extends BadgeProps {
  status?: string;
}

const SocialAvatar = ({
  imgUrl,
  status,
  alt,
  width = "40px",
  height = "40px",
}: {
  imgUrl: string;
  status?: string;
  alt: string;
  width?: string;
  height?: string;
}) => {
  return (
    <React.Fragment>
      {(status && (
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
          status={status}
        >
          <Avatar
            sx={{ width: width, height: height }}
            src={imgUrl || ""}
            alt={alt || ""}
          />
        </StyledBadge>
      )) || (
        <Avatar
          sx={{ width: width, height: height }}
          src={imgUrl || ""}
          alt={alt || ""}
        />
      )}
    </React.Fragment>
  );
};

export default SocialAvatar;

const statusColor: { [key: string]: string } = {
  online: "#44b700",
  busy: "#FF4C4C",
  away: "#FFB22C",
  offline: "#9a9a9a",
};

const StyledBadge = styled(Badge)<StyledBadgeProps>(({ theme, status }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: `${statusColor[status || "#9a9a9a"]}`,
    color: `${statusColor[status || "#9a9a9a"]}`,
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));
