import { assets } from "@/assets/assets";
import React from "react";
import { NavLink } from "react-router-dom";

const sidebarItems = [
  { name: "Dashboard", path: "/owner", icon: assets.dashboardIcon },
  { name: "AddRoom", path: "/owner/add-room", icon: assets.addIcon },
  { name: "ListRoom", path: "/owner/list-room", icon: assets.listIcon },
];

const SideBar = () => {
  return (
    <div className="md:w-65 w-16 border-r h-full text-base border-gray-300 pt-4 flex flex-col transition-all duration-300">
      {sidebarItems.map((item, index) => (
        <NavLink
          to={item.path}
          key={index}
          end
          className={({ isActive }) =>
            `flex items-center py-3 px-3 md:px-8 gap-3 
            ${
              isActive
                ? "border-r-4 md:border-r-[6px] text-blue-600 bg-blue-600/10"
                : "hover:bg-gray-100/90 border-white text-gray-700"
            }`
          }
        >
          <img src={item.icon} alt={item.name} className="min-w-5 min-h-5" />
          <span className="hidden md:block text-center">{item.name}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default SideBar;
