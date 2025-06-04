import { assets, facilityIcons, roomCommonData, roomsDummyData } from "@/assets/assets";
import StarRating from "@/components/StarRating";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [mainImage, setmianImage] = useState(null);

  useEffect(() => {
    const room = roomsDummyData.find((room) => room._id === id);
    room && setRoom(room);
    room && setmianImage(room.images[0]);
  }, []);

  return (
    room && (
      <div className="py-28 md:py25 px-4 md:px-16 lg:px-24 xl:px-32 mt-20 m-8">
        {/* Room Details */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2 ">
          <h1 className="font-playfair text-3xl md:text-5xl  ">
            {room.hotel.name}
            <span className="text-xl font-inter"> ({room.roomType})</span>
          </h1>
          <p className="text-xs font-inter py-1.5 px-3 text-white bg-orange-500 rounded-full">
            20% OFF
          </p>
        </div>
        {/* Room rating */}
        <div className="flex gap-2 mt-3  items-center text-2xl  ">
          <StarRating />
          <p className="m-2 ">200+ reviews</p>
        </div>

        {/* Room Address */}
        <div className="flex items-center gap-1 text-gray-500 mt-2">
          <img src={assets.locationIcon} alt="" />
          <p className="text-2xl">{room.hotel.address}</p>
        </div>
        {/* Room  Images*/}
        <div className="flex flex-col md:flex-row gap-6 justify-center mt-6">
          <div className="lg:w-1/2 w-full">
            <img
              src={mainImage}
              alt=""
              className=" w-full  shadow-lg rounded-xl object-cover "
            />
          </div>
          <div className="grid grid-cols-2 lg:w-1/2 w-full  gap-4">
            {room?.images.length > 1 &&
              room.images.map((images, index) => (
                <img
                  onClick={() => setmianImage(images)}
                  alt="room Images"
                  key={index}
                  src={images}
                  className={`w-full rounded-xl shadow-md object-cover cursor-pointer 
                ${mainImage === images && "outline-3 outline-orange-500"}`}
                />
              ))}
          </div>
        </div>
        {/* Room Highlight */}
        <div className="flex flex-col md:flex-row mt-10  md:justify-between ">
          <div className="flex flex-col">
            <h1 className="font-playfair text-3xl md:text-4xl">
              Experience Luxury Like Never Before
            </h1>
            <div className="flex flex-wrap gap-2 mt-4 mb-6">
              {room.amenities.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100"
                >
                  <img
                    src={facilityIcons[item]}
                    alt="facilityIcons"
                    className="w-5 h-5"
                  />
                  <p className="text-xs">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="text-2xl font-medium ">${room.pricePerNight}/night</p>
        </div>

        {/*  CheckedIn CheckedOut */}
        <form className="bg-white mt-16 border text-gray-700 rounded-xl px-6 py-6 w-full max-w-8xl mx-auto shadow-lg flex flex-col md:flex-row gap-6 items-center justify-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            {/* Check-In */}
            <div className="flex flex-col w-full">
              <label htmlFor="checkInDate" className="font-medium mb-1 text-xl">
                Check-In
              </label>
              <input
                type="date"
                id="checkInDate"
                name="checkIn"
                className="w-full text-gray-500 text-base md:text-lg rounded border border-gray-300 px-3 py-2 outline-none"
                required
              />
            </div>

            {/* Check-Out */}
            <div className="flex flex-col w-full">
              <label
                htmlFor="checkOutDate"
                className="font-medium mb-1 text-xl"
              >
                Check-Out
              </label>
              <input
                type="date"
                id="checkOutDate"
                name="checkOut"
                className="w-full text-gray-500 text-base md:text-lg rounded border border-gray-300 px-3 py-2 outline-none"
                required
              />
            </div>

            {/* Guests */}
            <div className="flex flex-col w-full">
              <label htmlFor="guests" className="font-medium mb-1 text-xl">
                Guests
              </label>
              <input
                type="number"
                id="guests"
                name="guests"
                placeholder="1"
                min="1"
                className="w-full text-gray-500 text-base md:text-lg rounded border border-gray-300 px-3 py-2 outline-none"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="w-full md:flex md:justify-end justify-center mt-5">
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 active:scale-95 transition-transform duration-200 text-white rounded-md w-full md:max-w-1/2 px-6 py-3 text-base  "
            >
              Check Avability
            </button>
          </div>
        </form>
        {/* Common Specification  */}
        <div className="space-y-4 mt-25">
          {roomCommonData.map((item, index) => (
            <div key={index} className="flex items-start gap-2">
              <img src={item.icon} alt="" className=" text-2xl w-6.5" />
              <div className="gap-1">
                <p className="text-base">{item.title}</p>
                <p className="text-gray-500">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="max-w-3xl border-y border-gray-300 my-15 py-10 text-gray-500 ">
          <p className="text-xl">
            Guests will be allocated on the ground floor according to
            availability. You get a comfortable Two bedroom apartment has a true
            city feeling. The price quoted is for two guest, at the guest slot
            please mark the number of guests to get the exact price for groups.
            The Guests will be allocated ground floor according to availability.
            You get the comfortable two bedroom apartment that has a true city
            feeling.
          </p>
        </div>
        <div className="flex flex-col items-start gap-4">
          <div className="flex  gap-4">
            <img
              src={room.hotel.owner.image}
              alt=""
              className=" h-14 w-14 md:h-18 md:w-18 rounded-full invert"
            />
            <div className="flex-row">
              <p className="text-lg md:text-xl">Hosted By {room.hotel.name}</p>
              <div className="flex flex-row gap-2">
                <StarRating />
                <p>200+ reviews</p>
              </div>
            </div>
          </div>
          <Button className="mt-6 bg-blue-600 px-12 py-7 cursor-pointer hover:to-blue-400 invert">Contact Now</Button>
        </div>
      </div>
    )
  );
};

export default RoomDetails;
