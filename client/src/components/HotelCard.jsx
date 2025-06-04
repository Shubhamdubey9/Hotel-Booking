import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const HotelCard = ({ room, index }) => {
  return (
    <Link
      to={`/rooms/${room._id}`}
      onClick={() => scrollTo(0, 0)}
      key={room._id}
      className="block max-w-70  w-full rounded-xl overflow-hidden bg-white text-gray-500  shadow-[0px_4px_4px_rgba(0,0,0,0.5)] "
    >
      <div className="bg-white rounded-2xl shadow-md overflow-hidden relative hover:shadow-lg transition-shadow duration-300 ">
        {/* Room Image */}
        <div className="relative">
          <img
            src={room?.images?.[0] || "fallback.jpg"}
            alt={room?.roomType}
            className="w-full h-60 object-cover"
          />
          {index % 2 === 0 && (
            <span className="absolute top-3 left-3 bg-white text-gray-800 text-xs font-medium px-3 py-1 rounded-full shadow">
              Best Seller
            </span>
          )}
        </div>

        {/* Content Section */}
        <div className="p-4 space-y-3">
          <div className="flex justify-between items-start">
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 font-playfair line-clamp-1">
              {room.hotel.name}
            </h3>
            <div className="flex items-center gap-1 text-yellow-500">
              <img src={assets.starIconFilled} alt="star" className="w-4 h-4" />
              <span className="text-sm font-medium text-gray-700">4.5</span>
            </div>
          </div>

          <div className="flex items-center text-sm text-gray-600 gap-1">
            <img
              src={assets.locationFilledIcon}
              alt="location"
              className="w-4 h-4"
            />
            <span className="line-clamp-1">{room.hotel.address}</span>
          </div>

          <div className="flex justify-between items-center mt-2">
            <p className="text-base text-gray-800">
              <span className="text-lg font-semibold">
                ${room.pricePerNight}
              </span>  
            </p>
            <button className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-amber-50 transition">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HotelCard;
