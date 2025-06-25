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
// const AllRoom = () => {
//   const { navigate, room } = useAppContext();
//   const [openFilter, setOpenFilter] = useState(false);
//   const [searchParams, setSearchParams] = useState();
//   const [selectedFilters, setSelectedFilters] = useState({
//     roomType: [],
//     priceRange: [],
//   });
//   const [sortOptions, setSortOptions] = useState("");

//   const roomtype = ["Single bed", "Double Bed", "luxury Room", "family suite"];
//   const priceRange = [
//     "0 to 500",
//     "500 to 1000",
//     "1000 to 2000",
//     "2000 to 3000",
//   ];
//   const sortOption = ["price low to High", "price high to low", "Newest first"];
//   // Function to handle checkbox selection
//   const handleCheckboxChange = (checked, value, type) => {
//     setSelectedFilters((prevFilter) => {
//       const updateFilter = { ...prevFilter };
//       if (checked) {
//         updateFilter[type].push(value);
//       } else {
//         updateFilter[type] = updateFilter[type].filter(
//           (item) => item !== value
//         );
//       }
//       return updateFilter;
//     });
//   };

//   const handleSortChange = (sortOption) => {
//     setSortOptions(sortOption);
//   };

//   // Function to check if room matches selected filters

//   const matchRooms = (room) => {
//     return (
//       selectedFilters.roomType.length === 0 ||
//       selectedFilters.roomType.includes(room.roomType)
//     );
//   };

//   // Function to check if room matches price range
//   const matchPriceRange = (room) => {
//     return (
//       selectedFilters.priceRange.length === 0 ||
//       selectedFilters.priceRange.some((range) => {
//         const [min, max] = range.split(" to ").map(Number);
//         return room.pricePerNight >= min && room.pricePerNight <= max;
//       })
//     );
//   };

//   // Function to sort rooms based on selected option
//   const sortRooms = (a, b) => {
//     if (sortOptions === "price low to High") {
//       return a.pricePerNight - b.pricePerNight;
//     } else if (sortOptions === "price high to low") {
//       return b.pricePerNight - a.pricePerNight;
//     } else if (sortOptions === "Newest first") {
//       return new Date(b.createdAt) - new Date(a.createdAt);
//     }
//     return 0; // Default case
//   };
//   // Filter destination based on selected filters
//   const filterDestination = (room) => {
//     if (!searchParams || typeof searchParams.get !== "function") return true;
//     const destinatiion = searchParams.get("destination");
//     if (!destinatiion) return true;
//     return (
//       room.hotel &&
//       room.hotel.city &&
//       room.hotel.city.toLowerCase().includes(destinatiion.toLowerCase())
//     );
//   };

//   // fileter rooms based on selected filters and sort options
//   const filteredRooms = useMemo(() => {
//     if (!Array.isArray(room)) return [];
//     return room
//       .filter(
//         (room) =>
//           matchRooms(room) && matchPriceRange(room) && filterDestination(room)
//       )
//       .sort(sortRooms);
//   }, [room, selectedFilters, sortOptions, searchParams]);

//   // clear all filters

//   const clearFilters = () => {
//     setSelectedFilters({
//       roomType: [],
//       priceRange: [],
//     });
//     setSortOptions("");
//     setSearchParams();
//   };

//   return (
//     <div className="flex flex-col-reverse lg:flex-row items-start justify-between pt-28 md:pt-35 px-4 md:px-16 lg:px-24">
//       <div>
//         <div className="flex flex-col items-start text-left">
//           <h1 className="text-5xl font-playfair md:text-[40px]">Hotel Rooms</h1>
//           <p className="mt-3 font-playfair text-sm md:text-base  text-gray-500/90 max-w-174">
//             Take advantage of our limited-time offers and special packages to
//             enhance your stay and create unforgettable memories.
//           </p>
//         </div>
//         <div>
//           {filteredRooms.length === 0 ? (
//             <div className="text-gray-500 text-lg mt-10">
//               No rooms found matching your criteria.
//             </div>
//           ) : (
//             filteredRooms.map((room) => (
//               <div
//                 key={room._id}
//                 className="flex flex-col md:flex-row items-start py-10 gap-6 border-b border-gray-300 last:pb-30 last:border-0"
//               >
//                 <img
//                   onClick={() => {
//                     navigate(`/rooms/${room._id}`);
//                     window.scrollTo(0, 0);
//                   }}
//                   src={
//                     room.images && room.images[0]
//                       ? room.images[0]
//                       : assets.roomImg1
//                   }
//                   alt="hotel-img"
//                   title="View Room Details"
//                   className="max-h-65 md:w-1/2 rounded-xl shadow-lg object-cover cursor-pointer"
//                 />
//                 <div className="flex flex-col md:w-1/2 gap-2">
//                   <p className="text-gray-500">
//                     {room.hotel && room.hotel.city
//                       ? room.hotel.city
//                       : "No city"}
//                   </p>
//                   <p
//                     onClick={() => {
//                       navigate(`/rooms/${room._id}`);
//                       window.scrollTo(0, 0);
//                     }}
//                     className="text-gray-800 text-3xl font-playfair cursor-pointer"
//                   >
//                     {room.hotel && room.hotel.name
//                       ? room.hotel.name
//                       : "No name"}
//                   </p>
//                   <div className="flex items-center mt-2 text-2xl gap-1">
//                     <StarRating />
//                     <span className="ml-2">200+ reviews</span>
//                   </div>
//                   <div>
//                     <img src={assets.locationIcon} alt="l" />
//                     <span>
//                       {room.hotel && room.hotel.address
//                         ? room.hotel.address
//                         : "No address"}
//                     </span>
//                   </div>
//                   {/* Room Aminities */}
//                   <div className="flex flex-wrap mt-3  mb-6 gap-4">
//                     {Array.isArray(room.amenities) &&
//                     room.amenities.length > 0 ? (
//                       room.amenities.map((item, index) => (
//                         <div
//                           key={index}
//                           className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F5F5FF]/70"
//                         >
//                           <img
//                             src={facilityIcons[item]}
//                             alt=""
//                             className="w-5 h-5"
//                           />
//                           <p className="text-xs">{item}</p>
//                         </div>
//                       ))
//                     ) : (
//                       <span className="text-xs text-gray-400">
//                         No amenities listed
//                       </span>
//                     )}
//                   </div>
//                   {/* Room Price Per Night */}
//                   <p className="text-xl font-medium text-gray-800">
//                     ₹{room.pricePerNight} / night
//                   </p>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//       {/* FIlter */}
//       <div className="bg-white w-80 border border-gray-300 text-gray-600 max-lg:mb-8 min-lg:mt-16">
//         <div
//           className={`flex items-center justify-between px-5 py-2.5 min-lg:border-b border-gray-300 ${
//             openFilter && "bob"
//           } `}
//         >
//           <p className="text-base font-medium text-gray-800">FILTER</p>
//           <div className="text-xs cursor-pointer ">
//             <span
//               onClick={() => setOpenFilter(!openFilter)}
//               className="lg:hidden"
//             >
//               {" "}
//               {openFilter ? "HIDE" : "SHOW"}
//             </span>
//             <span onClick={clearFilters} className="hidden lg:block">
//               CLEAR
//             </span>
//           </div>
//         </div>
//         <div
//           className={`${
//             openFilter ? "h-auto" : "h-0 lg:h-auto"
//           } overflow-hidden transition-all duration-700`}
//         >
//           <div className="px-5 pt-5">
//             <p className="font-medium text-gray-800 pb-2">Popular Filter</p>
//             {roomtype.map((room, index) => (
//               <Checkbox
//                 key={index}
//                 label={room}
//                 selected={selectedFilters.roomType.includes(room)}
//                 onChange={(checked) =>
//                   handleCheckboxChange(checked, room, "roomType")
//                 }
//               />
//             ))}
//           </div>
//           <div className="px-5 pt-5">
//             <p className="font-medium text-gray-800 pb-2">Price Range</p>
//             {priceRange.map((range, index) => (
//               <Checkbox
//                 key={index}
//                 label={`₹ ${range}`}
//                 selected={selectedFilters.priceRange.includes(range)}
//                 onChange={(checked) =>
//                   handleCheckboxChange(checked, range, "priceRange")
//                 }
//               />
//             ))}
//           </div>
//           <div className="px-5 pt-5 pb-7">
//             <p className="font-medium text-gray-800 pb-2">Sort Option </p>
//             {sortOption.map((sort, index) => (
//               <RadioButton
//                 key={index}
//                 label={sort}
//                 selected={sortOptions === sort}
//                 onChange={handleSortChange}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllRoom;

// ...imports remain same

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
