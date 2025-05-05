import React from "react";

interface NavItemNotificationProps {
  icon: React.ReactNode;
  title: string;
  onClick: () => void;
  notiCount: number;
}

const NavItemNotification = ({
  icon,
  title,
  onClick,
  notiCount,
}: NavItemNotificationProps) => (
  <div
    className="flex items-center h-16 px-4 cursor-pointer transition-all duration-200 relative"
    onClick={onClick}
  >
    <span className="relative text-gray-500 text-xl">
      {icon}
      {notiCount > 0 && (
        <small className="absolute top-[-0.5rem] right-[-0.5rem] bg-red-500 text-white text-xs rounded-full px-1">
          {notiCount > 9 ? "9+" : notiCount}
        </small>
      )}
    </span>
    <h3 className="ml-4 text-base">{title}</h3>
  </div>
);

export default NavItemNotification;
