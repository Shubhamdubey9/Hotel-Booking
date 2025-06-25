import { assets } from "@/assets/assets";
import Title from "@/components/Title";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/context/useAppContext";
import { setLoading } from "@/redux/authSlice";
import { ROOM_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import { useDispatch } from "react-redux";

const AddRoom = () => {
  const { navigate, loading } = useAppContext();

  const dispatch = useDispatch();

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

  // const formData =  new FormData();
  // formData.append('roomType',input.roomType)
  // formData.append("pricePerNight", input.pricePerNight);
  // // converting Amenities to Array & keeping only enabled amenities
  // const amenities = Object.keys(input.amenities).filter(key => input.amenities[key])
  // formData.append('amenities',JSON.stringify(amenities))

  // // Adding Images to formData

  // Object.keys(images).forEach((key)=>{
  //   images[key] && formData.append('images',images[key])
  // })

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // ✅ Validate inputs
    if (
      !input.roomType ||
      !input.pricePerNight ||
      Object.values(input.amenities).every((val) => val === false) ||
      !Object.values(images).some((image) => image)
    ) {
      toast.error("Please fill all details");
      return;
    }

    // ✅ Build FormData inside submit handler
    const formData = new FormData();
    formData.append("roomType", input.roomType);
    formData.append("pricePerNight", input.pricePerNight);

    const amenities = Object.keys(input.amenities).filter(
      (key) => input.amenities[key]
    );
    formData.append("amenities", JSON.stringify(amenities));

    Object.keys(images).forEach((key) => {
      if (images[key]) {
        formData.append("images", images[key]);
      }
    });

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${ROOM_API_END_POINT}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        setTimeout(() => {
          toast.success(res.data.message);
          setInput({
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
          setImages({ 1: null, 2: null, 3: null, 4: null });
        }, 1000);
        // Reset form
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Room creation failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
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
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Room Creating...
            </>
          ) : (
            "Add Room"
          )}
        </Button>
      </form>
    </div>
  );
};

export default AddRoom;
