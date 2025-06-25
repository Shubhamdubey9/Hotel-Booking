import React from "react";
import NavBar from "./components/NavBar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./Page/Home";
import Footer from "./components/Footer";
import AllRoom from "./Page/AllRoom";
import RoomDetails from "./Page/RoomDetails";
import Mybooking from "./Page/Mybooking";
import HotelReg from "./components/HotelReg";
import Layout from "./Page/HotelOwner/Layout";
import DashBoard from "./Page/HotelOwner/DashBoard";
import AddRoom from "./Page/HotelOwner/AddRoom";
import ListRoom from "./Page/HotelOwner/ListRoom";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import { useAppContext } from "./context/useAppContext";
import { Toaster } from "sonner";
import ViewProfile from "./components/ViewProfile";

const App = () => {
  const isOwnerPath = useLocation().pathname.includes("owner");
  const { showHotelReg } = useAppContext();
  return (
    <div>
      <Toaster />
      {!isOwnerPath && <NavBar />}
      {showHotelReg && <HotelReg />}
      <div className="min-h-[70vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<AllRoom />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/rooms/:id" element={<RoomDetails />} />
          <Route path="/view-profile" element={<ViewProfile />}  />
          <Route path="/my-booking" element={<Mybooking />} />
          <Route path="/owner" element={<Layout />}>
            <Route index element={<DashBoard />} />
            <Route path="add-room" element={<AddRoom />} />
            <Route path="list-room" element={<ListRoom />} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
