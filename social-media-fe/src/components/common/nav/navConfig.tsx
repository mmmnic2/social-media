import {
  Home as HomeIcon,
  Explore as ExploreIcon,
  Notifications as NotificationsIcon,
  Message as MessageIcon,
  Bookmark as BookmarkIcon,
  DarkMode as DarkModeIcon,
  Settings as SettingsIcon,
  LogoutOutlined as LogoutOutlinedIcon,
} from "@mui/icons-material";
import { NavigationMenu } from "./types";

export const navigationMenu: NavigationMenu[] = [
  { title: "Home", icon: <HomeIcon />, id: "home", path: "/" },
  { title: "Explore", icon: <ExploreIcon />, id: "explore", path: "/reels" },
  {
    title: "Notifications",
    icon: <NotificationsIcon />,
    id: "notifications",
    path: "/notification",
  },
  { title: "Message", icon: <MessageIcon />, id: "messages", path: "/message" },
  {
    title: "Bookmarks",
    icon: <BookmarkIcon />,
    id: "bookmarks",
    path: "/saved-post",
  },
  {
    title: "Theme",
    icon: <DarkModeIcon />,
    id: "theme",
    isMobileVisible: false,
  },
  {
    title: "Settings",
    icon: <SettingsIcon />,
    id: "settings",
    path: "/setting",
    isMobileVisible: false,
  },
  {
    title: "Logout",
    icon: <LogoutOutlinedIcon />,
    id: "logout",
    isMobileVisible: false,
  },
];
