// Import required modules
import { v2 as cloudinary } from "cloudinary";
import { Hotel } from "../Models/Hotel.Model.js";
import { Room } from "../Models/room.model.js";
//import fs from "fs";

// API to create a new room
export const createRoom = async (req, res) => {
  try {
    const { roomType, pricePerNight, amenities } = req.body;
    const hotel = await Hotel.findOne({ owner: req.user._id });
    if (!hotel) {
      return res.json({
        success: false,
        message: "Hotel not found for this owner",
      });
    }

    // Upload images to Cloudinary

    // Upload images to Cloudinary
    const uploadImages = req.files.map(async (file) => {
      const base64 = `data:${file.mimetype};base64,${file.buffer.toString(
        "base64"
      )}`;
      const result = await cloudinary.uploader.upload(base64);
      return result.secure_url;
    });

    // const uploadImages = req.files.map(async (file) => {
    //   const response = await cloudinary.uploader.upload(file.path);
    //   //fs.unlink(file.path, () => {}); // delete temp file
    //   return response.secure_url;
    // });

    const images = await Promise.all(uploadImages);

    await Room.create({
      hotel: hotel._id,
      roomType,
      pricePerNight: +pricePerNight,
      amenities: JSON.parse(amenities),
      images,
    });

    res.json({
      success: true,
      message: "Room created successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// API to get all available rooms
export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find({ isAvailable: true })
      .populate({
        path: "hotel",
        populate: {
          path: "owner",
          select: "image",
        },
      })
      .sort({ createdAt: -1 });

    res.json({ success: true, rooms });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// API to get all rooms for a specific hotel owner
export const getOwnerRooms = async (req, res) => {
  try {
    const hotelData = await Hotel.findOne({ owner: req.user._id });

    if (!hotelData) {
      return res.json({
        success: false,
        message: "Hotel not found for this owner",
      });
    }

    const rooms = await Room.find({ hotel: hotelData._id }).populate("hotel");

    res.json({ success: true, rooms });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// API to toggle availability of a room
export const toggleRoomAvailability = async (req, res) => {
  try {
    const { roomId } = req.body;
    const room = await Room.findById(roomId);

    if (!room) {
      return res.json({
        success: false,
        message: "Room not found",
      });
    }

    room.isAvailable = !room.isAvailable;
    await room.save();

    res.json({
      success: true,
      message: `Room availability set to ${room.isAvailable}`,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
