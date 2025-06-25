import React, { useEffect, useState } from "react";
import HotelCard from "./HotelCard";
import Title from "./Title";
import { Button } from "./ui/button";
import { useAppContext } from "@/context/useAppContext";

const RecommendedHotel = () => {
  const { room, searchedCities } = useAppContext();
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    if (!Array.isArray(room) || !Array.isArray(searchedCities)) {
      setRecommended([]);
      return;
    }
    // If searchedCities is empty, show top 4 rooms as fallback
    if (searchedCities.length === 0) {
      setRecommended(room && Array.isArray(room) ? room.slice(0, 4) : []);
      return;
    }
    const filteredHotels = room.filter(
      (room) => room?.hotel?.city && searchedCities.includes(room.hotel.city)
    );
    setRecommended(filteredHotels);
  }, [room, searchedCities]);

  if (!Array.isArray(recommended) || recommended.length === 0) {
    return (
      <div className="flex flex-col items-center px-6 md:px-12 lg:px-24 bg-slate-50 py-20">
        <Title
          title={"Recommended Hotels"}
          subTitle={
            "No recommended hotels found. Try searching for a city or check back later."
          }
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center px-6 md:px-12 lg:px-24 bg-slate-50 py-20">
      <Title
        title={"Recommended Hotels"}
        subTitle={
          "Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences."
        }
      />
      <div className="flex flex-row items-center justify-center gap-10 mt-20">
        {recommended.slice(0, 4).map((room, index) => (
          <HotelCard key={room._id} room={room} index={index} />
        ))}
      </div>
    </div>
  );
};

export default RecommendedHotel;
