import Title from "@/components/Title";
import React, { useState } from "react";
import { userBookingsDummyData } from "../assets/assets/";
import { assets } from "@/assets/assets";

const Mybooking = () => {
  const [bookings, setBookings] = useState(userBookingsDummyData);

  return (
    <div className="py-24 px-4 md:px-16 lg:px-24 xl:px-32 bg-white min-h-screen">
      <Title
        title="My Booking"
        subTitle="Easily manage your past, current, and upcoming hotel reservations in one place. Plan your trips seamlessly with just a few clicks."
        align="left"
      />

      <div className="max-w-6xl mt-10 w-full mx-auto">
        {/* Table Headers */}
        <div className="hidden md:grid grid-cols-[3fr_2fr_1fr] gap-4   mb-3 text-gray-700 font-semibold text-sm">
          <div>Hotel</div>
          <div>Date & Timings</div>
          <div className="text-right">Payment</div>
        </div>

        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] gap-6 border-t py-6 text-gray-700 md:border-b"
          >
            {/* Hotel Details */}
            <div className="flex flex-col sm:flex-row gap-4">
              <img
                src={booking.room.images[0]}
                alt="Room"
                className="w-full sm:w-36 h-28 object-cover rounded-lg shadow"
              />
              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold">
                    {booking.hotel.name}
                    <span className="text-sm text-gray-500 ml-2">
                      {booking.room.roomType}
                    </span>
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                    <img
                      src={assets.locationIcon}
                      alt="location"
                      className="w-4 h-4"
                    />
                    <span>{booking.hotel.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                    <img
                      src={assets.guestsIcon}
                      alt="guests"
                      className="w-4 h-4"
                    />
                    <span>Guests: {booking.guests}</span>
                  </div>
                </div>
                <p className="text-base font-medium mt-2">
                  Total: ${booking.totalPrice}
                </p>
              </div>
            </div>

            {/* Date & Time */}
            <div className="text-sm space-y-1 flex flex-col md:flex-row gap-5 justify-center">
              <p className="font-semibold text-gray-600">
                <span className="font-medium ">Check-In: </span>
                {new Date(booking.checkInDate).toDateString()}
              </p>
              <p className="font-semibold text-gray-600">
                <span className="font-medium ">Check-Out: </span>
                {new Date(booking.checkOutDate).toDateString()}
              </p>
            </div>

            {/* Payment Status */}
            <div className="flex flex-col items-end justify-center gap-2 text-sm">
              {booking.isPaid ? (
                <div className="flex items-center gap-2 text-green-600 font-semibold">
                  <span className="w-2.5 h-2.5 bg-green-500 rounded-full" />
                  Paid
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2 text-red-600 font-semibold">
                    <span className="w-2.5 h-2.5 bg-red-500 rounded-full" />
                    Unpaid
                  </div>
                  {!booking.isPaid && (
                    <button className="px-4 py-1 rounded-full border text-sm hover:bg-gray-100 transition-all -mx-4 cursor-pointer">
                      Pay now
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mybooking;
