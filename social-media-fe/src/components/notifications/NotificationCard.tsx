import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button, Menu, MenuItem } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useMarkAsReadNoti } from "@/hooks/api-hooks/notification-hooks/useNotification";
import { Notification } from "@/types/notificationTypes";
import { parseTime } from "@/utils/utils";
import SocialAvatar from "../common/avatar/SocialAvatar";

interface NotificationCardProps {
  notiInfo: Notification;
}

const NotificationCard = ({ notiInfo }: NotificationCardProps) => {
  const { sender, read, notificationId } = notiInfo;
  const [isRead, setIsRead] = useState(read);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { mutate: markAsReadMutate } = useMarkAsReadNoti();
  const queryClient = useQueryClient();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMarkAsRead = () => {
    markAsReadMutate(notificationId, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["get-all-noti"],
        });
      },
    });
  };
  useEffect(() => {
    setIsRead(notiInfo?.read);
  }, [notiInfo]);

  return (
    <div
      className={`flex items-center gap-2 ${isRead ? "bg-white" : "bg-active-side-bar"} rounded-md mb-2 px-2 py-4`}
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
              <MenuItem onClick={handleMarkAsRead}>Mark as read</MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
