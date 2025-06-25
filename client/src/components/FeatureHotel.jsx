import React from "react";
import HotelCard from "./HotelCard";
import Title from "./Title";
import { Button } from "./ui/button";
import { useAppContext } from "@/context/useAppContext";
import { ROOM_API_END_POINT } from "@/utils/constant";

const FeatureHotel = () => {
  const { navigate, room } = useAppContext();

  if (!Array.isArray(room) || room.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col items-center px-6 md:px-12 lg:px-24 bg-slate-50 py-20">
      <Title
        title={"Featured Destination"}
        subTitle={
          "Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences."
        }
      />
      <div className="flex flex-row items-center justify-center gap-10 mt-20">
        {room.slice(0, 4).map((room, index) => (
          <HotelCard key={room._id} room={room} index={index} />
        ))}
      </div>
      <Button
        onClick={() => {
          navigate("/rooms");
          window.scrollTo(0, 0);
        }}
        className="my-16 px-4 py-2 text-sm font-medium hover:bg-blue-700"
      >
        View All Destination
      </Button>
    </div>
  );
};

export default FeatureHotel;
