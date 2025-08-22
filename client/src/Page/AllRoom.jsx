 import { assets, facilityIcons } from "@/assets/assets";
import React, { useMemo, useState } from "react";
 import StarRating from "../components/StarRating";
 import { useAppContext } from "@/context/useAppContext";

const Checkbox = ({ label, selected = false, onChange = () => {} }) => {
  return (
    <label className="flex gap-3 items-center cursor-pointer mt-2 text-xl font-playfair ">
      <input
        type="checkbox"
        checked={selected}
        onChange={(e) => onChange(e.target.checked, label)}
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
  const { navigate, room } = useAppContext();
  const [openFilter, setOpenFilter] = useState(false);
  const [searchParams, setSearchParams] = useState();
  const [selectedFilters, setSelectedFilters] = useState({
    roomType: [],
    priceRange: [],
  });
  const [sortOptions, setSortOptions] = useState("");

  const roomtype = ["Single bed", "Double Bed", "luxury Room", "family suite"];
  const priceRange = [
    "0 to 500",
    "500 to 1000",
    "1000 to 2000",
    "2000 to 3000",
  ];
  const sortOption = ["price low to High", "price high to low", "Newest first"];

  const handleCheckboxChange = (checked, value, type) => {
    setSelectedFilters((prevFilter) => {
      const updateFilter = { ...prevFilter };
      if (checked) updateFilter[type].push(value);
      else
        updateFilter[type] = updateFilter[type].filter(
          (item) => item !== value
        );
      return updateFilter;
    });
  };

  const handleSortChange = (sortOption) => setSortOptions(sortOption);

  const matchRooms = (room) =>
    selectedFilters.roomType.length === 0 ||
    selectedFilters.roomType.includes(room.roomType);

  const matchPriceRange = (room) =>
    selectedFilters.priceRange.length === 0 ||
    selectedFilters.priceRange.some((range) => {
      const [min, max] = range.split(" to ").map(Number);
      return room.pricePerNight >= min && room.pricePerNight <= max;
    });

  const sortRooms = (a, b) => {
    if (sortOptions === "price low to High")
      return a.pricePerNight - b.pricePerNight;
    if (sortOptions === "price high to low")
      return b.pricePerNight - a.pricePerNight;
    if (sortOptions === "Newest first")
      return new Date(b.createdAt) - new Date(a.createdAt);
    return 0;
  };

  const filterDestination = (room) => {
    if (!searchParams || typeof searchParams.get !== "function") return true;
    const destination = searchParams.get("destination");
    if (!destination) return true;
    return room.hotel?.city?.toLowerCase().includes(destination.toLowerCase());
  };

  const filteredRooms = useMemo(() => {
    if (!Array.isArray(room)) return [];
    return room
      .filter(
        (room) =>
          matchRooms(room) && matchPriceRange(room) && filterDestination(room)
      )
      .sort(sortRooms);
  }, [room, selectedFilters, sortOptions, searchParams]);

  const clearFilters = () => {
    setSelectedFilters({ roomType: [], priceRange: [] });
    setSortOptions("");
    setSearchParams();
  };

  return (
    <div className="pt-28 md:pt-36 px-4 md:px-12 lg:px-20 flex flex-col-reverse lg:flex-row gap-10">
      {/* Rooms */}
      <div className="flex-1">
        <div className="mb-6">
          <h1 className="text-4xl font-playfair">Hotel Rooms</h1>
          <p className="mt-2 text-gray-600 text-sm md:text-base max-w-xl">
            Take advantage of our limited-time offers and special packages to
            enhance your stay and create unforgettable memories.
          </p>
        </div>

        {filteredRooms.length === 0 ? (
          <p className="text-gray-500 text-lg mt-10">
            No rooms found matching your criteria.
          </p>
        ) : (
          filteredRooms.map((room) => (
            <div
              key={room._id}
              className="flex flex-col md:flex-row gap-6 mb-10 pb-8 border-b border-gray-300"
            >
              <img
                src={room.images?.[0] || assets.roomImg1}
                alt="Room"
                onClick={() => {
                  navigate(`/rooms/${room._id}`);
                  window.scrollTo(0, 0);
                }}
                className="w-full md:w-1/2 h-60 object-cover rounded-lg shadow-md cursor-pointer"
              />

              <div className="flex flex-col gap-3 md:w-1/2">
                <p className="text-gray-500">{room.hotel?.city || "No city"}</p>
                <h2
                  className="text-2xl font-playfair text-gray-800 cursor-pointer"
                  onClick={() => {
                    navigate(`/rooms/${room._id}`);
                    window.scrollTo(0, 0);
                  }}
                >
                  {room.hotel?.name || "No name"}
                </h2>
                <div className="flex items-center text-lg gap-2">
                  <StarRating />
                  <span className="text-sm text-gray-600">200+ reviews</span>
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <img
                    src={assets.locationIcon}
                    alt="Location"
                    className="w-4 h-4 mr-2"
                  />
                  <span>{room.hotel?.address || "No address"}</span>
                </div>
                <div className="flex flex-wrap gap-3 mt-3">
                  {Array.isArray(room.amenities) &&
                  room.amenities.length > 0 ? (
                    room.amenities.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#F5F5FF]/70 text-xs"
                      >
                        <img
                          src={facilityIcons[item]}
                          alt={item}
                          className="w-4 h-4"
                        />
                        <span>{item}</span>
                      </div>
                    ))
                  ) : (
                    <span className="text-xs text-gray-400">
                      No amenities listed
                    </span>
                  )}
                </div>
                <p className="text-lg font-semibold text-gray-800 mt-2">
                  ₹{room.pricePerNight}{" "}
                  <span className="text-sm text-gray-500">/ night</span>
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Filter Section */}
      <div className="w-full lg:w-[300px] bg-white border border-gray-200 rounded-md shadow-sm">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">FILTER</h3>
          <div className="text-xs space-x-2">
            <span
              className="cursor-pointer text-blue-600 lg:hidden"
              onClick={() => setOpenFilter(!openFilter)}
            >
              {openFilter ? "HIDE" : "SHOW"}
            </span>
            <span
              className="hidden lg:inline cursor-pointer text-red-500"
              onClick={clearFilters}
            >
              CLEAR
            </span>
          </div>
        </div>
        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            openFilter ? "max-h-[1000px]" : "max-h-0 lg:max-h-[1000px]"
          }`}
        >
          <div className="p-4">
            <p className="font-semibold mb-2 text-gray-800">Room Type</p>
            {roomtype.map((room, index) => (
              <Checkbox
                key={index}
                label={room}
                selected={selectedFilters.roomType.includes(room)}
                onChange={(checked) =>
                  handleCheckboxChange(checked, room, "roomType")
                }
              />
            ))}
          </div>
          <div className="p-4 pt-0">
            <p className="font-semibold mb-2 text-gray-800">Price Range</p>
            {priceRange.map((range, index) => (
              <Checkbox
                key={index}
                label={`₹ ${range}`}
                selected={selectedFilters.priceRange.includes(range)}
                onChange={(checked) =>
                  handleCheckboxChange(checked, range, "priceRange")
                }
              />
            ))}
          </div>
          <div className="p-4 pt-0">
            <p className="font-semibold mb-2 text-gray-800">Sort By</p>
            {sortOption.map((sort, index) => (
              <RadioButton
                key={index}
                label={sort}
                selected={sortOptions === sort}
                onChange={handleSortChange}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRoom;
