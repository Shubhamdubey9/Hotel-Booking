import { roomsDummyData } from '@/assets/assets'
import Title from '@/components/Title'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React, { useState } from 'react'

const ListRoom = () => {
  const [rooms,setRooms] = useState(roomsDummyData)
  return (
    <div>
      <Title
        align="left"
        title="Room Listing"
        subTitle="View,edit or manage all listed rooms. Keep the information up to date to provide the best experience for users"
      />
      <p className="text-gray-500 mt-8 ">ALl Rooms</p>
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
                  {item.amenities.join(",")}
                </td>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                  {item.pricePerNight}
                </td>
                <td className="py-3 px-4 text-red-500 border-t border-gray-300 text-center invert-1">
                  <label htmlFor="" className='relative inline-flex items-center cursor-pointer text-gray-900 gap-3'>
                    <input type="checkbox" className='sr-only peer:' name="" id="" checked={item.isAvailable}/>
                    <div className='invert w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200'></div>
                    <span className='dot absolute left-1 top-1 w-5 bg-white rounded-full transition-transform duration-200
                     ease-in-out peer-checked:translate-x-5'></span>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default ListRoom