import React from "react";
import { assets, cities } from "../assets/assets";

const Hero = () => {
  return (
    <div
      className="flex flex-col items-center justify-center text-center text-white h-screen
      px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32
      bg-[url('/src/assets/heroImage.png')] bg-no-repeat bg-cover bg-center"
    >
      <p className="bg-[#49B9FF]/70 px-4 py-1.5 rounded-full text-xs sm:text-sm md:text-base mt-24 md:mt-20">
        The Ultimate Hotel Experience
      </p>

      <h2 className="font-playfair text-2xl sm:text-4xl md:text-5xl lg:text-[56px] font-bold leading-snug md:leading-tight max-w-2xl mt-6">
        Discover Your Perfect Gateway Destination
      </h2>

      <p className="text-sm sm:text-base md:text-lg max-w-xl mt-4 text-white/90">
        Unparalleled luxury and comfort await at the world's most exclusive
        hotels and resorts. Start your journey today.
      </p>

      {/* Search Form */}
      <form className="bg-white mt-8 text-gray-600 rounded-xl px-6 py-5 flex flex-col md:flex-row items-stretch md:items-end gap-4 w-full max-w-4xl shadow-lg">
        {/* Destination */}
        <div className="flex-1">
          <label
            className="text-sm font-medium flex items-center gap-2"
            htmlFor="destinationInput"
          >
            <img src={assets.calenderIcon} alt="Destination" className="h-4" />
            Destination
          </label>
          <input
            list="destinations"
            id="destinationInput"
            type="text"
            className="w-full rounded border border-gray-200 px-3 py-2 mt-1.5 text-sm outline-none"
            placeholder="Type here"
            required
          />
          <datalist id="destinations">
            {cities.map((city, index) => (
              <option value={city} key={index} />
            ))}
          </datalist>
        </div>

        {/* Check In */}
        <div className="flex-1">
          <label
            className="text-sm font-medium flex items-center gap-2"
            htmlFor="checkIn"
          >
            <img src={assets.calenderIcon} alt="Check in" className="h-4" />
            Check in
          </label>
          <input
            id="checkIn"
            type="date"
            className="w-full rounded border border-gray-200 px-3 py-2 mt-1.5 text-sm outline-none"
          />
        </div>

        {/* Check Out */}
        <div className="flex-1">
          <label
            className="text-sm font-medium flex items-center gap-2"
            htmlFor="checkOut"
          >
            <img src={assets.calenderIcon} alt="Check out" className="h-4" />
            Check out
          </label>
          <input
            id="checkOut"
            type="date"
            className="w-full rounded border border-gray-200 px-3 py-2 mt-1.5 text-sm outline-none"
          />
        </div>

        {/* Guests */}
        <div className="flex-1">
          <label className="text-sm font-medium" htmlFor="guests">
            Guests
          </label>
          <input
            min={1}
            max={4}
            id="guests"
            type="number"
            className="w-full rounded border border-gray-200 px-3 py-2 mt-1.5 text-sm outline-none"
            placeholder="0"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-6 py-3 rounded-md transition-all duration-200 w-full md:w-auto mt-2 md:mt-0"
        >
          <div className="flex items-center justify-center gap-2">
            <img src={assets.calenderIcon} alt="Search" className="h-5" />
            <span>Search</span>
          </div>
        </button>
      </form>
    </div>
  );
};

export default Hero;
