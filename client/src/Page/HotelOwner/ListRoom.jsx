import { roomsDummyData } from "@/assets/assets";
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
import { ROOM_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const ListRoom = () => {
  const [rooms, setRooms] = useState([]);
  const user = useSelector((state) => state.auth.user);

  const fetchRoom = async () => {
    try {
      const res = await axios.get(`${ROOM_API_END_POINT}/owner`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        setRooms(res.data.rooms || []);
        if (res?.data?.message) toast.success(res.data.message);
      } else {
        toast.error(res?.data?.message || "Failed to fetch rooms");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Failed to fetch rooms"
      );
    }
  };

  // Toggle availability of Room
  const handleToggle = async (roomId) => {
    try {
      const res = await axios.post(
        `${ROOM_API_END_POINT}/toggle-availability`,
        { roomId },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setTimeout(() => {
          toast.success(res.data.message);
          fetchRoom();
        }, 1000);
      } else {
        toast.error(res.data.message || "Failed to toggle availability");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Failed to toggle availability"
      );
    }
  };

  useEffect(() => {
    if (user) {
      fetchRoom();
    }
  }, [user]);

  return (
    <div>
      <Title
        align="left"
        title="Room Listing"
        subTitle="View,edit or manage all listed rooms. Keep the information up to date to provide the best experience for users"
      />
      <p className="text-gray-500 mt-8 text-2xl mb-2 font-playfair">
        ALL ROOMS
      </p>
      <div className="w-full max-w-3xl text-left  border border-gray-300 rounded-lg max-h-80 overflow-y-scroll">
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow className="bg-gray-200">
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>Facility</TableHead>
              <TableHead>Pric Per Night</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <tbody className="text-sm">
            {rooms.map((item, index) => (
              <tr key={index}>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                  {item.roomType}
                </td>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300 max-sm:hidden">
                  {Array.isArray(item.amenities)
                    ? item.amenities.join(", ")
                    : "-"}
                </td>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                  {item.pricePerNight}
                </td>
                <td className="py-3 px-4  border-t border-gray-300 text-end">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={item.isAvailable}
                      className="sr-only peer"
                      onChange={() => handleToggle(item._id)}
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-green-500 transition-colors duration-200"></div>
                    <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ListRoom;
