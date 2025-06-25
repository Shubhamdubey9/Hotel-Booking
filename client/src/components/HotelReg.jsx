import { assets, cities } from "@/assets/assets";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { useAppContext } from "@/context/useAppContext";
import { HOTEL_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { toast } from "sonner";

const HotelReg = () => {
  const { setShowHotelReg, isOwner, setIsOwner } = useAppContext();

  const [input, setInput] = useState({
    name: "",
    address: "",
    contact: "",
    city: "",
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(`${HOTEL_API_END_POINT}`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res?.data?.message);
        setIsOwner(true);
        setShowHotelReg(false);
      } else {
        toast.error(res?.data?.message || "Registration failed");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  return (
    <div
      onClick={() => setShowHotelReg(false)}
      className="fixed top-0 bottom-0 left-0 right-0 z-100 flex items-center justify-center bg-black/70 "
    >
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="flex bg-white rounded-xl max-w-4xl md:max-w-2xl"
      >
        <img
          src={assets.regImage}
          alt=""
          className="w-1/2 rounded-xl hidden md:block"
        />
        <div className="relative flex flex-col items-center md:w-1/2 p-8 md:p-10">
          <img
            src={assets.closeIcon}
            alt=""
            onClick={() => setShowHotelReg(false)}
            className="absolute top-4 right-4 h-4 w-4 cursor-pointer"
          />
          <p className="text-2xl font-semibold mt-6">Register Your Hotel</p>
          <div className="w-full mt-4">
            <label htmlFor="name" className="font-medium text-gray-500">
              Hotel Name
            </label>
            <input
              id="name"
              name="name"
              value={input.name}
              onChange={changeEventHandler}
              type="text"
              placeholder="type Here"
              className="border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light"
              required
            />
          </div>
          <div className="w-full mt-4">
            <label htmlFor="contact" className="font-medium text-gray-500">
              Phone Number
            </label>
            <input
              id="contact"
              name="contact"
              value={input.contact}
              onChange={changeEventHandler}
              type="tel"
              pattern="[0-9]{10,15}"
              placeholder="type Here"
              className="border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light"
              required
            />
          </div>
          <div className="w-full mt-4">
            <label htmlFor="address" className="font-medium text-gray-500">
              Hotel Address
            </label>
            <input
              id="address"
              name="address"
              type="text"
              value={input.address}
              onChange={changeEventHandler}
              placeholder="type Here"
              className="border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light"
              required
            />
          </div>
          <div className="w-full mt-4 max-w-60 mr-auto">
            <label htmlFor="city" className="font-medium text-gray-500">
              City
            </label>
            <select
              value={input.city}
              name="city"
              onChange={changeEventHandler}
              id="city"
              className="border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light"
              required
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <Button className="invert mt-6 bg-indigo-500 hover:bg-indigo-600 transation-all text-white mr-auto px-8 py-2 rounded-b-lg cursor-pointer">
            Register
          </Button>
        </div>
      </form>
    </div>
  );
};

export default HotelReg;
