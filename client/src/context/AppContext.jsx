import { ROOM_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { Children, createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((store) => store.auth.loading);
  const [isOwner, setIsOwner] = useState(false);
  const [showHotelReg, setShowHotelReg] = useState(false);
  const [searchedCities, setSearchedhCities] = useState([]);
  const [room, setRoom] = useState([]);
  const [showProfile, setShowProfile] = useState(false);

  const fetchRoom = async () => {
    try {
      const response = await axios.get(`${ROOM_API_END_POINT}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (response.data.success) {
        setRoom(response.data.rooms);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchRoom();
      setIsOwner(user.role === "hotelOwner");
      if (user.recent) {
        setSearchedhCities(user.recent);
      }
    }
  }, [user]);

  // const fetchUser = ()=>{
  //     try {
  //         if(user){
  //             setIsOwner(user.role == "hotelOwner")
  //             setSearchedhCities(user.recent)

  //         }
  //     } catch (error) {
  //         console.log("user Not found",error.message)

  //     }

  // }

  const value = {
    navigate,
    user,
    loading,
    isOwner,
    setIsOwner,
    showHotelReg,
    setShowHotelReg,
    searchedCities,
    setSearchedhCities,
    room,
    setRoom,
    showProfile,
    setShowProfile,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
