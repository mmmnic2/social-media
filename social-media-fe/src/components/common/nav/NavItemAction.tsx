import React from "react";

interface NavItemActionProps {
  icon: React.ReactNode;
  title: string;
  onClick: () => void;
}

const NavItemAction = ({ icon, title, onClick }: NavItemActionProps) => (
  <div
    className="flex items-center h-16 px-4 cursor-pointer transition-all duration-200 relative"
    onClick={onClick}
  >
    <span className="relative text-gray-500 text-xl">{icon}</span>
    <h3 className="ml-4 text-base">{title}</h3>
  </div>
);

export default NavItemAction;
