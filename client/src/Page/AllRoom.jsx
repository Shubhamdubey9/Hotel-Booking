import { assets, facilityIcons, roomsDummyData } from "@/assets/assets";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StarRating from "../components/StarRating";
const Checkbox = ({ label, selected = false, onChange = () => {} }) => {
  return (
    <label className="flex gap-3 items-center cursor-pointer mt-2 text-xl font-playfair ">
      <input
        type="checkbox"
        checked={selected}
        onChange={(e) => onChange(e.target.checked,label)}
      />
      <span className="font-light select-none">{label}</span>
    </label>
  );
};
const RadioButton = ({ label, selected = false, onChange = () => {} }) => {
  return (
    <label className="flex gap-3 items-center cursor-pointer mt-2 text-xl font-playfair ">
      <input
        type="radio"
        name="sortOption"
        checked={selected}
        onChange={() => onChange(label)}
      />
      <span className="font-light select-none">{label}</span>
    </label>
  );
};
const AllRoom = () => {
  const navigate = useNavigate();
  const [openFilter, setOpenFilter] = useState(false);

  const roomtype = ["Single bed", "Double Bed", "luxury Room", "family suite"];
  const priceRange = [
    "0 to 500",
    "500 to 1000",
    "1000 to 2000",
    "2000 to 3000",
  ];
  const sortOption = ["price low to High", "price high to low", "Newest first"];
  return (
    <div className="flex flex-col-reverse lg:flex-row items-start justify-between pt-28 md:pt-35 px-4 md:px-16 lg:px-24">
      <div>
        <div className="flex flex-col items-start text-left">
          <h1 className="text-5xl font-playfair md:text-[40px]">Hotel Rooms</h1>
          <p className="mt-3 font-playfair text-sm md:text-base  text-gray-500/90 max-w-174">
            Take advantage of our limited-time offers and special packages to
            enhance your stay and create unforgettable memories.
          </p>
        </div>
        <div>
          {roomsDummyData.map((room) => (
            <div
              key={room._id}
              className="flex flex-col md:flex-row items-start py-10 gap-6 border-b border-gray-300 last:pb-30 last:border-0"
            >
              <img
                onClick={() => {
                  navigate(`/rooms/${room._id}`);
                  scrollTo(0, 0);
                }}
                src={room.images[0]}
                alt="hotel-img"
                title="View Room Details"
                className="max-h-65 md:w-1/2 rounded-xl shadow-lg object-cover cursor-pointer"
              />
              <div className="flex flex-col md:w-1/2 gap-2">
                <p className="text-gray-500">{room.hotel.city}</p>
                <p
                  onClick={() => {
                    navigate(`/rooms/${room._id}`);
                    scrollTo(0, 0);
                  }}
                  className="text-gray-800 text-3xl font-playfair cursor-pointer"
                >
                  {room.hotel.name}
                </p>
                <div className="flex items-center mt-2 text-2xl gap-1">
                  <StarRating />
                  <span className="ml-2">200+ reviews</span>
                </div>
                <div>
                  <img src={assets.locationIcon} alt="l" />
                  <span>{room.hotel.address}</span>
                </div>
                {/* Room Aminities */}
                <div className="flex flex-wrap mt-3  mb-6 gap-4">
                  {room.amenities.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F5F5FF]/70"
                    >
                      <img
                        src={facilityIcons[item]}
                        alt=""
                        className="w-5 h-5"
                      />
                      <p className="text-xs">{item}</p>
                    </div>
                  ))}
                </div>
                {/* Room Price Per Night */}
                <p className="text-xl font-medium text-gray-800">
                  ${room.pricePerNight} / night
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* FIlter */}
      <div className="bg-white w-80 border border-gray-300 text-gray-600 max-lg:mb-8 min-lg:mt-16">
        <div
          className={`flex items-center justify-between px-5 py-2.5 min-lg:border-b border-gray-300 ${
            openFilter && "bob"
          } `}
        >
          <p className="text-base font-medium text-gray-800">FILTER</p>
          <div className="text-xs cursor-pointer ">
            <span
              onClick={() => setOpenFilter(!openFilter)}
              className="lg:hidden"
            >
              {" "}
              {openFilter ? "HIDE" : "SHOW"}
            </span>
            <span className="hidden lg:block">CLEAR</span>
          </div>
        </div>
        <div
          className={`${
            openFilter ? "h-auto" : "h-0 lg:h-auto"
          } overflow-hidden transition-all duration-700`}
        >
          <div className="px-5 pt-5">
            <p className="font-medium text-gray-800 pb-2">Popular Filter</p>
            {roomtype.map((room, index) => (
              <Checkbox key={index} label={room} />
            ))}
          </div>
          <div className="px-5 pt-5">
            <p className="font-medium text-gray-800 pb-2">Price Range</p>
            {priceRange.map((range, index) => (
              <Checkbox key={index} label={`$ ${range}`} />
            ))}
          </div>
          <div className="px-5 pt-5 pb-7">
            <p className="font-medium text-gray-800 pb-2">Sort Option </p>
            {sortOption.map((sort, index) => (
              <RadioButton key={index} label={sort} className='text-2xl font-bold' />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRoom;
