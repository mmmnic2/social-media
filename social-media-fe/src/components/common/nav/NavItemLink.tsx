import Link from "next/link";
import React from "react";
import { NavigationMenu } from "./types";

interface NavItemLinkProps {
  item: NavigationMenu;
  isActive: boolean;
  isLogin: boolean;
  badge?: React.ReactNode;
}

const NavItemLink = ({ item, isActive, isLogin, badge }: NavItemLinkProps) => (
  <Link
    href={isLogin ? item.path || "#" : "/login"}
    className={`flex items-center h-16 px-4 cursor-pointer transition-all duration-200 relative ${
      isActive ? "bg-active-side-bar text-text-primary" : ""
    }`}
  >
    <span className="relative text-gray-500 text-xl">
      {item.icon}
      {badge}
    </span>
    <h3 className="ml-4 text-base">{item.title}</h3>
    {isActive && (
      <span className="absolute left-0 h-full w-1 bg-primary rounded-l-lg" />
    )}
  </Link>
);

export default NavItemLink;
