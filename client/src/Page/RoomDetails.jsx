// import { facilityIcons } from "@/assets/assets";
// import StarRating from "@/components/StarRating";
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import { BOOKING_API_END_POINT } from "@/utils/constant";
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { toast } from "sonner";
// import axios from "axios";
// import { useAppContext } from "@/context/useAppContext";

// const RoomDetails = () => {
//   const { id } = useParams();
//   const { navigate, room } = useAppContext();
//   const [rooms, setRooms] = useState(null);
//   const [mainImage, setmianImage] = useState(null);
//   const [checkedInDate, setCheckedInDate] = useState("");
//   const [checkedOutDate, setCheckedOutDate] = useState("");
//   const [guests, setGuests] = useState(1);
//   const [isAvailable, setIsAvailable] = useState(false);

//   const checkAvailability = async () => {
//     try {
//       if (checkedInDate >= checkedOutDate) {
//         toast.error("Check-in date should be before check-out date");
//         return false;
//       }

//       const res = await axios.post(
//         `${BOOKING_API_END_POINT}/check-availability`,
//         {
//           roomId: id,
//           checkInDate: checkedInDate,
//           checkOutDate: checkedOutDate,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           withCredentials: true,
//         }
//       );

//       if (res.data.success && res.data.isAvailable) {
//         setIsAvailable(true);
//         toast.success("Room is available for booking");
//         return true;
//       } else {
//         setIsAvailable(false);
//         toast.error("Room is not available for booking");
//         return false;
//       }
//     } catch (error) {
//       toast.error(error?.response?.data?.message || error.message);
//       return false;
//     }
//   };

//   // check availability on form submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const available = await checkAvailability();
//     if (!available) return;

//     try {
//       const res = await axios.post(
//         `${BOOKING_API_END_POINT}/book`,
//         {
//           roomId: id,
//           checkInDate: checkedInDate,
//           checkOutDate: checkedOutDate,
//           guests: guests,
//           paymentMethod: "pay at hotel",
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           withCredentials: true,
//         }
//       );

//       if (res.data.success) {
//         toast.success(res.data.message);
//         navigate("/my-booking");
//       } else {
//         toast.error(res.data.message);

//       }
//     } catch (error) {
//       toast.error(error?.response?.data?.message || error.message);
//     }
//   };

//   useEffect(() => {
//     if (!Array.isArray(room)) return;
//     const foundRoom = room.find((r) => r._id === id);
//     if (foundRoom) {
//       setRooms(foundRoom);
//       setmianImage(
//         foundRoom.images && foundRoom.images[0] ? foundRoom.images[0] : null
//       );
//     }
//   }, [id, room]);

//   if (!rooms) {
//     return (
//       <div className="text-center py-20 text-gray-500 text-lg">
//         Room not found.
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-2 py-4 md:px-6 md:py-8 lg:px-12 lg:py-12 xl:px-32 xl:py-16 mt-15">
//       <div className="flex flex-col md:flex-row gap-8">
//         {/* Left side: Images */}
//         <div className="flex flex-col md:w-1/3 gap-4 items-center">
//           <img
//             src={mainImage}
//             alt="Room"
//             className="h-[250px] w-full rounded-lg object-cover md:h-[350px] lg:h-[400px]"
//           />
//           <div className="flex flex-row flex-wrap gap-2 justify-center mt-2">
//             {rooms?.images?.slice(0, 4).map((image, index) => (
//               <img
//                 key={index}
//                 src={image}
//                 alt={`Room ${index + 1}`}
//                 className={`h-16 w-16 md:h-16 md:w-16 lg:h-20 lg:w-20 cursor-pointer rounded-lg object-cover border-2 ${
//                   mainImage === image ? "border-blue-500" : "border-transparent"
//                 }`}
//                 onClick={() => setmianImage(image)}
//               />
//             ))}
//           </div>
//         </div>
//         {/* Right side: Details */}
//         <div className="flex-1">
//           <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
//             {rooms?.title || rooms?.roomType || "Room"}
//           </h2>
//           <div className="mt-2 flex items-center flex-wrap gap-2">
//             <StarRating rating={rooms?.rating} />
//             <span className="ml-2 text-gray-600 text-sm">
//               ({rooms?.reviews?.length || 0} reviews)
//             </span>
//           </div>
//           <div className="mt-4 flex items-center justify-between flex-wrap gap-2">
//             <div>
//               <span className="text-xl md:text-2xl font-bold text-blue-600">
//                 ₹{rooms?.pricePerNight || rooms?.price || 0}
//               </span>
//               <span className="text-gray-500 ml-1">/night</span>
//             </div>
//             <button
//               onClick={() => navigate(-1)}
//               className="rounded-full bg-gray-200 px-4 py-2 text-gray-700 text-xs md:text-sm hover:bg-blue-300 transition-colors"
//             >
//               Back to rooms
//             </button>
//           </div>
//           <Separator className="my-3 md:my-4" />
//           <div>
//             <h3 className="text-lg md:text-xl font-semibold">Description</h3>
//             <p className="mt-2 text-gray-700 text-sm md:text-base">
//               {rooms?.description || "No description available."}
//             </p>
//           </div>
//           <Separator className="my-3 md:my-4" />
//           <div>
//             <h3 className="text-lg md:text-xl font-semibold">Amenities</h3>
//             <ul className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 text-gray-700 text-sm md:text-base">
//               {Array.isArray(rooms?.amenities) && rooms.amenities.length > 0 ? (
//                 rooms.amenities.map((amenity, index) => (
//                   <li key={index} className="flex items-center">
//                     <img
//                       src={facilityIcons[amenity]}
//                       alt={amenity}
//                       className="mr-2 h-5 w-5"
//                     />
//                     {amenity}
//                   </li>
//                 ))
//               ) : (
//                 <li className="text-gray-400">No amenities listed.</li>
//               )}
//             </ul>
//           </div>
//           <Separator className="my-3 md:my-4" />
//           <div>
//             <h3 className="text-lg md:text-xl font-semibold">Availability</h3>
//             <form
//               onSubmit={handleSubmit}
//               className="mt-2 grid grid-cols-1 gap-4"
//             >
//               <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                 <div>
//                   <label
//                     htmlFor="checkIn"
//                     className="mb-2 block text-xs md:text-sm font-medium text-gray-700"
//                   >
//                     Check-in Date
//                   </label>
//                   <input
//                     type="date"
//                     id="checkIn"
//                     value={checkedInDate}
//                     onChange={(e) => setCheckedInDate(e.target.value)}
//                     className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 text-xs md:text-sm"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="checkOut"
//                     className="mb-2 block text-xs md:text-sm font-medium text-gray-700"
//                   >
//                     Check-out Date
//                   </label>
//                   <input
//                     type="date"
//                     id="checkOut"
//                     value={checkedOutDate}
//                     onChange={(e) => setCheckedOutDate(e.target.value)}
//                     className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 text-xs md:text-sm"
//                     required
//                   />
//                 </div>
//               </div>
//               <div>
//                 <label
//                   htmlFor="guests"
//                   className="mb-2 block text-xs md:text-sm font-medium text-gray-700"
//                 >
//                   Number of Guests
//                 </label>
//                 <input
//                   type="number"
//                   id="guests"
//                   value={guests}
//                   onChange={(e) => setGuests(Number(e.target.value))}
//                   className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 text-xs md:text-sm"
//                   min="1"
//                   max="10"
//                   required
//                 />
//               </div>
//               <Button
//                 type="submit"
//                 className="mt-4 rounded-full bg-blue-600 px-6 py-2 text-white text-xs md:text-sm"
//               >
//                 {isAvailable ? "Check Availability" : "Book Now"}
//               </Button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RoomDetails;





// RoomDetails.jsx
import { facilityIcons } from "@/assets/assets";
import StarRating from "@/components/StarRating";
import { Button } from "@/components/ui/button";
import { BOOKING_API_END_POINT } from "@/utils/constant";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { useAppContext } from "@/context/useAppContext";
import { MapPin, Percent } from "lucide-react";

const RoomDetails = () => {
  const { id } = useParams();
  const { navigate, room } = useAppContext();
  const [rooms, setRooms] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [checkedInDate, setCheckedInDate] = useState("");
  const [checkedOutDate, setCheckedOutDate] = useState("");
  const [guests, setGuests] = useState(2);
  const [isAvailable, setIsAvailable] = useState(false);

  const checkAvailability = async () => {
    try {
      if (checkedInDate >= checkedOutDate) {
        toast.error("Check-in date should be before check-out date");
        return false;
      }

      const res = await axios.post(
        `${BOOKING_API_END_POINT}/check-availability`,
        {
          roomId: id,
          checkInDate: checkedInDate,
          checkOutDate: checkedOutDate,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.success && res.data.isAvailable) {
        setIsAvailable(true);
        toast.success("Room is available for booking");
        return true;
      } else {
        setIsAvailable(false);
        toast.error("Room is not available for booking");
        return false;
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const available = await checkAvailability();
    if (!available) return;

    try {
      const res = await axios.post(
        `${BOOKING_API_END_POINT}/book`,
        {
          roomId: id,
          checkInDate: checkedInDate,
          checkOutDate: checkedOutDate,
          guests,
          paymentMethod: "pay at hotel",
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/my-booking");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (!Array.isArray(room)) return;
    const foundRoom = room.find((r) => r._id === id);
    if (foundRoom) {
      setRooms(foundRoom);
      setMainImage(foundRoom.images?.[0] || null);
    }
  }, [id, room]);

  if (!rooms) {
    return <div className="text-center py-20 text-gray-500">Room not found.</div>;
  }

  return (
    <div className="container mx-auto px-2 py-4 md:px-6 md:py-8 lg:px-12 lg:py-12 xl:px-32 xl:py-16 mt-15">
      {/* Title and Details */}
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-semibold">
            {rooms?.hotelName || "The Grand Resort"}{" "}
            <span className="text-gray-500 text-base">({rooms?.roomType})</span>
          </h1>
          <span className="text-white bg-orange-500 text-xs px-2 py-1 rounded-full">
            <Percent size={12} className="inline-block mr-1" /> 20% OFF
          </span>
        </div>
        <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>Los Angeles, California, USA</span>
        </div>
        <div className="flex items-center gap-2 mt-1 text-sm">
          <StarRating rating={rooms?.rating || 5} />
          <span className="text-gray-600">
            {rooms?.reviews?.length || 200}+ reviews
          </span>
        </div>
      </div>

      {/* Images */}
      <div className="flex flex-col lg:flex-row gap-4">
        <img
          src={mainImage}
          alt="Main"
          className="rounded-lg w-full lg:w-1/2 object-cover h-[300px]"
        />
        <div className="grid grid-cols-2 grid-rows-2 gap-2 w-full lg:w-1/2">
          {rooms?.images?.slice(0, 4).map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`thumbnail-${i}`}
              onClick={() => setMainImage(img)}
              className={`h-[140px] w-full object-cover cursor-pointer rounded-lg ${
                mainImage === img ? "ring-2 ring-blue-500" : ""
              }`}
            />
          ))}
        </div>
      </div>

      {/* Price and Facilities */}
      <div className="mt-6 flex justify-between flex-wrap items-center">
        <h2 className="text-xl font-semibold">
          Experience Luxury Like Never Before
        </h2>
        <p className="text-xl font-bold text-blue-600">
          ₹{rooms?.pricePerNight || 299}/
          <span className="text-sm font-normal text-gray-600">day</span>
        </p>
      </div>
      <div className="flex gap-4 mt-2 text-sm text-gray-600">
        <span className="bg-gray-100 px-3 py-1 rounded-full">🛜 Free wifi</span>
        <span className="bg-gray-100 px-3 py-1 rounded-full">
          🍳 Free breakfast
        </span>
        <span className="bg-gray-100 px-3 py-1 rounded-full">
          🛎 Room service
        </span>
      </div>

      {/* Booking Form */}
      <form
        onSubmit={handleSubmit}
        className="mt-6 bg-white rounded-lg shadow p-4 grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Check-In
          </label>
          <input
            type="date"
            className="w-full border rounded px-3 py-2 mt-1"
            value={checkedInDate}
            onChange={(e) => setCheckedInDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Check-Out
          </label>
          <input
            type="date"
            className="w-full border rounded px-3 py-2 mt-1"
            value={checkedOutDate}
            onChange={(e) => setCheckedOutDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Guests
          </label>
          <input
            type="number"
            min="1"
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full border rounded px-3 py-2 mt-1"
            required
          />
        </div>
        <div className="flex items-end">
          <Button
            type="submit"
            className="w-full bg-blue-600 text-white hover:bg-blue-700"
          >
            Check Availability
          </Button>
        </div>
      </form>

      {/* Highlights */}
      <div className="mt-8 space-y-3 text-sm text-gray-700">
        <div>
          🛏 <strong>Clean Room</strong>: You will have the clean room for you.
        </div>
        <div>
          ✨ <strong>Enhanced Clean</strong>: This host has committed to
          Staybnb’s cleaning process.
        </div>
        <div>
          📍 <strong>Great location</strong>: 90% of recent guests gave the
          location a 5-star rating.
        </div>
        <div>
          ✅ <strong>Great check-in experience</strong>: 100% of guests gave the
          check-in process a 5-star rating.
        </div>
      </div>

      {/* Footer Note */}
      <p className="mt-6 text-xs text-gray-500">
        Guests will be allocated on the ground floor according to availability.
        You get a comfortable two-bedroom apartment that has a true city
        feeling. The price quoted is for two guests...
      </p>
    </div>
  );
};

export default RoomDetails;

