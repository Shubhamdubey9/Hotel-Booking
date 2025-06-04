import { assets, dashboardDummyData } from "@/assets/assets";
import Title from "@/components/Title";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import React, { useState } from "react";

const DashBoard = () => {
  const [dashBoard, setDashBoard] = useState(dashboardDummyData);
  return (
    <div>
      <Title
        title="DashBoard"
        align="left"
        font="outfit"
        subTitle="Monitor your room listing,track booking and anaylyze 
      revenue-all in one place , stay update with real time insight to ensure smooth operation "
      />
      <div className="flex gap-4 my-8">
        {/*  total Bookin */}
        <div className="bg-primary/3 border border-primary/10 rounded flex p-4">
          <img
            src={assets.totalBookingIcon}
            alt=""
            className="max-sm:hidden h-10"
          />
          <div className="flex flex-col sm:ml-4 font-medium">
            <p className="text-lg text-blue-400 font">Total Booking</p>
            <p text-base text-neutral-400>
              {dashBoard.totalBookings}
            </p>
          </div>
        </div>
        {/* Total Revenue */}
        <div className="bg-primary/3 border border-primary/10 rounded flex p-4">
          <img
            src={assets.totalRevenueIcon}
            alt=""
            className="max-sm:hidden h-10"
          />
          <div className="flex flex-col sm:ml-4 font-medium">
            <p className="text-lg text-blue-400 font">Total Revenue</p>
            <p text-base text-neutral-400>
              {dashBoard.totalRevenue}
            </p>
          </div>
        </div>
      </div>
      {/* Recent Booking */}
      <h2 className="text-xl text-blue-950/70 font-medium mb-5">
        Recent Booking
      </h2>
      <div className="w-full max-w-3xl text-left  border border-gray-300 rounded-lg max-h-80 overflow-y-scroll">
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow className="bg-gray-200">
              <TableHead className="w-[100px]">User Name</TableHead>
              <TableHead>Room Name</TableHead>
              <TableHead>Total Amount</TableHead>
              <TableHead className="text-right">Payment Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dashBoard.bookings.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="py-3 px-4 text-gray-700 border-t border-gray-300">
                  {item.user.username}
                </TableCell>
                <TableCell className="py-3 px-4 text-gray-700 border-t border-gray-300">
                  {item.room.roomType}
                </TableCell>
                <TableCell className="py-3 px-4 text-gray-700 border-t border-gray-300">
                  ${item.totalPrice}
                </TableCell>
                <TableCell className="text-right py-3 px-4 text-gray-700 border-t border-gray-300">
                  {item.status}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DashBoard;
