import { assets } from "@/assets/assets";
import Title from "@/components/Title";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

const AddRoom = () => {
  const [images, setImages] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
  });
  const [input, setInput] = useState({
    roomType: "",
    pricePerNight: 0,
    amenities: {
      "free wifi": false,
      "free Breakfast": false,
      "room service": false,
      "Mountain View": false,
      "pool Access": false,
    },
  });
  return (
    <div>
      <form>
        <Title
          align="left"
          font="outfit"
          title="Add Room"
          subTitle="Fill int the details carefully and accurate room detaill,price,animities, to enhance the user booking experience "
        />

        {/* Upload Are nof Image*/}
        <p className="text-gray-800 mt-10">Images</p>
        <div className="grid grid-cols-2 sm:flex gap-4 my-2 flex-wrap">
          {Object.keys(images).map((key) => (
            <label htmlFor={`roomImage${key}`} key={key}>
              <img
                className="max-h-13 cursor-pointer opacity-80"
                src={
                  images[key]
                    ? URL.createObjectURL(images[key])
                    : assets.uploadArea
                }
                alt=""
              />
              <input
                type="file"
                accept="image/*"
                hidden
                id={`roomImage${key}`}
                onChange={(e) =>
                  setImages({ ...images, [key]: e.target.files[0] })
                }
              />
            </label>
          ))}
        </div>
        <div className="w-full flex max-sm:flex-col sm:gap-4 mt-4">
          <div className="flex-1 max-w-48 ">
            <p className="text-gray-800 mt-4">Room Type</p>
            <select
              value={input.roomType}
              onChange={(e) => setInput({ ...input, roomType: e.target.value })}
              className="border opacity-70 border-gray-300 mt-1 rounded p-2 w-full"
            >
              <option value="">Select Room Type</option>
              <option value="Single Bed">Single Bed</option>
              <option value="Double Bed">Double Bed</option>
              <option value="Luxury Bed">Luxury Bed</option>
              <option value="Family suite">Family suite</option>
            </select>
          </div>
          <div>
            <p className="mt-4 text-gray-800">
              price <span className="text-xs">Per Night</span>
            </p>
            <input
              type="number"
              placeholder="0"
              className="border border-gray-300 mt-1 rounded p-2 w-24"
              value={input.pricePerNight}
              name=""
              id=""
              onChange={(e) =>
                setInput({ ...input, pricePerNight: e.target.value })
              }
            />
          </div>
        </div>
        <p className="text-gray-800 mt-4  ">Aminities</p>
        <div className="flex flex-col flex-wrap mt-1 text-gray-400 max-w-sm">
          {Object.keys(input.amenities).map((amenity, index) => (
            <div key={index}>
              <input
                type="checkbox"
                name=""
                id={`amenities${index}`}
                checked={input.amenities[amenity]}
                onChange={() =>
                  setInput({
                    ...input,
                    amenities: {
                      ...input.amenities,
                      [amenity]: !input.amenities[amenity],
                    },
                  })
                }
              />
              <label htmlFor={`amenities${index}`}> {amenity}</label>
            </div>
          ))}
        </div>
        <Button className=" bg-primary text-white px-8 py-2 rounded mt-6 cursor-pointer ">
          Add Room
        </Button>
      </form>
    </div>
  );
};

export default AddRoom;
