"use client";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import ExploreIcon from "@mui/icons-material/Explore";
import GroupIcon from "@mui/icons-material/Group";
import HomeIcon from "@mui/icons-material/Home";
import ListAltIcon from "@mui/icons-material/ListAlt";
import MessageIcon from "@mui/icons-material/Message";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Avatar, Button, Card, Divider, Menu, MenuItem } from "@mui/material";
import Link from "next/link";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLogout } from "@/hooks/api-hooks/auth-hooks/useAuth";
import { logout } from "@/redux/auth";
import { allNotiSeletor } from "@/redux/notifications/selectors";
const navigationMenu = [
  {
    tilte: "Home",
    icon: <HomeIcon />,
    path: "/",
  },
  {
    tilte: "Reels",
    icon: <ExploreIcon />,
    path: "/reels",
  },
  {
    tilte: "Create Reels",
    icon: <ControlPointIcon />,
    path: "/create-reels",
  },
  {
    tilte: "Notification",
    icon: <NotificationsIcon />,
    path: "/notification",
  },
  {
    tilte: "Message",
    icon: <MessageIcon />,
    path: "/message",
  },
  {
    tilte: "Lists",
    icon: <ListAltIcon />,
    path: "/lists",
  },
  {
    tilte: "Communities",
    icon: <GroupIcon />,
    path: "/communities",
  },
  {
    tilte: "Profile",
    icon: <AccountCircleIcon />,
    path: "/profile",
  },
];

const Sidebar = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const userSelector = useSelector((state: any) => state.user);
  const allNoti = useSelector((state: any) => state.noti);
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { mutate: logoutAction } = useLogout();
  const handleLogout = () => {
    logoutAction();
  };
  return (
    <Card className="card h-screen flex flex-col justify-between py-5">
      <div className="space-y-8 pl-5">
        <div>
          <span className="logo font-bold text-xl">Lan Social</span>
        </div>
        <div className="space-y-8">
          {navigationMenu.map((nav, index) => (
            <Link
              key={index}
              href={
                nav.tilte === "Profile"
                  ? nav.path + `/${userSelector?.id}`
                  : nav.path
              }
              className="cursor-pointer flex space-x-3 item"
            >
              {nav.icon}
              <p className="text-xl">{nav.tilte}</p>
            </Link>
          ))}
        </div>
      </div>
      <div>
        <Divider />
        <div className="pl-5 flex items-center justify-between pt-5">
          <div className="flex items-center space-x-3">
            <Avatar src="https://png.pngtree.com/png-clipart/20210608/ourlarge/pngtree-dark-gray-simple-avatar-png-image_3418404.jpg" />
            <div>
              <p className="font-bold">
                {userSelector?.first_name} {userSelector?.last_name}
              </p>
              <p className="opacity-70">{userSelector.email}</p>
            </div>
          </div>
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
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
    </Card>
  );
};
export default Sidebar;
