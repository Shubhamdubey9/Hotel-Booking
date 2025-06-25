import Navbar from "@/components/HotelOwner/Navbar";
import SideBar from "@/components/HotelOwner/SideBar";
import NavBar from "@/components/NavBar";
import { useAppContext } from "@/context/useAppContext";
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const { isOwner, navigate } = useAppContext();

  useEffect(() => {
    if (!isOwner) {
      navigate("/");
    }
  }, [isOwner, navigate]);

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex h-full">
        <SideBar />
        <div className="flex-1 p-4 pt-10 md:px-10 h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
