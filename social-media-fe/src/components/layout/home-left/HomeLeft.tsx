/* eslint-disable react/display-name */
"use client";

import { Divider } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useMemo } from "react";

import AvatarWithInfo from "@/components/common/avatarWithInfo/AvatarWithInfo";
import { navigationMenu } from "@/components/common/nav/navConfig";
import NavItemAction from "@/components/common/nav/NavItemAction";
import NavItemLink from "@/components/common/nav/NavItemLink";
import NavItemNotification from "@/components/common/nav/NavItemNotification";
import NotificationDialog from "@/components/notifications/NotificationDialog";

import { useLogout } from "@/hooks/api-hooks/auth-hooks/useAuth";
import { useAppStores } from "@/lib/context/AppStoreContext";

const HomeLeft = ({ isLogin }: { isLogin: boolean }) => {
  const { mutate: logoutAction } = useLogout();
  const { userStore, notificationStore } = useAppStores();
  const user = userStore?.getState().user;
  const notifications = notificationStore?.getState().notifications;
  const pathName = usePathname();

  const [openNotiDialog, setOpenNotiDialog] = useState(false);

  const handleLogout = () => logoutAction();
  const handleCloseNotiDialog = () => setOpenNotiDialog(false);

  const renderNavItem = useMemo(
    () => (item: (typeof navigationMenu)[number]) => {
      const isActive = item.path === pathName;

      if (item.id === "logout") {
        return (
          <NavItemAction
            key={item.id}
            icon={item.icon}
            title={item.title}
            onClick={handleLogout}
          />
        );
      }

      if (item.id === "notifications") {
        return (
          <NavItemNotification
            key={item.id}
            icon={item.icon}
            title={item.title}
            onClick={() => setOpenNotiDialog(true)}
            notiCount={notifications?.length}
          />
        );
      }

      return (
        <NavItemLink
          key={item.id}
          item={item}
          isActive={isActive}
          isLogin={isLogin}
          badge={
            item.id === "messages" ? (
              <small className="absolute top-[-0.5rem] right-[-0.5rem] bg-red-500 text-white text-xs rounded-full px-1">
                6
              </small>
            ) : undefined
          }
        />
      );
    },
    [pathName, isLogin, notifications?.length],
  );

  return (
    <div className="sticky top-0 h-max basis-1/4">
      <Link
        href={`/profile/${user?.id}` || "#"}
        className="flex items-center p-4 bg-white rounded-md mt-4"
      >
        <AvatarWithInfo
          imgUrl={user?.imageUrl || "/"}
          alt={user?.firstName || "Lan Lan"}
          title={
            user?.firstName ? `${user.firstName} ${user.lastName}` : "Lan Lan"
          }
          subtitle={
            user?.firstName ? `@${user.firstName.toLowerCase()}` : "@lanlan"
          }
        />
      </Link>

      <div className="mt-4 bg-white rounded-md">
        {navigationMenu.map((item) => (
          <React.Fragment key={item.id}>
            {item.id === "logout" && <Divider sx={{ color: "gray" }} />}
            {renderNavItem(item)}
          </React.Fragment>
        ))}
      </div>

      <NotificationDialog
        open={openNotiDialog}
        onClose={handleCloseNotiDialog}
      />
    </div>
  );
};

export default HomeLeft;
