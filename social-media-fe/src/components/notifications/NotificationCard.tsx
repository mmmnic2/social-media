import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button, Menu, MenuItem } from "@mui/material";
import React from "react";
import { NotiInfo } from "@/redux/notifications/state";
import { parseTime } from "@/utils/utils";
import SocialAvatar from "../common/avatar/SocialAvatar";

interface NotificationCardProps {
  notiInfo: NotiInfo;
}

const NotificationCard = ({ notiInfo }: NotificationCardProps) => {
  const { sender, read } = notiInfo;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div
      className={`flex items-center gap-2 ${read ? "bg-white" : "bg-active-side-bar"} rounded-md mb-2 px-2 py-4`}
    >
      <SocialAvatar
        width="3rem"
        height="3rem"
        imgUrl={"/"}
        alt={`${sender.firstName}`}
      />
      <div className="flex-1">
        <div className="flex justify-between">
          <div className="">
            <p>{notiInfo.message}</p>
            <span className="text-xs">{parseTime(notiInfo.modifiedDate)}</span>
          </div>
          <div>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <MoreVertIcon />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              anchorOrigin={{
                vertical: "center",
                horizontal: "right",
              }}
            >
              <MenuItem onClick={handleClose}>Mark as read</MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
