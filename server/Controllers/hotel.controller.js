import { Hotel } from "../Models/Hotel.Model.js";
import { User } from "../Models/User.Model.js";

export const registerHotel = async (req, res) => {
  try {
    const { name, address, contact, city } = req.body;

    const owner = req.user._id;
    console.log("REQ.USER:", req.user);
    console.log("REQ.BODY:", req.body);

    // Check if hotel already registered by this user
    const existingHotel = await Hotel.findOne({ owner });
    if (existingHotel) {
      return res.json({ success: false, message: "Hotel already registered" });
    }

    // Create new hotel
    await Hotel.create({
      name,
      address,
      contact,
      city,
      owner,
    });

    // Update user role to hotelOwner
    await User.findByIdAndUpdate(owner, { role: "hotelOwner" });

    res.json({ success: true, message: "Hotel registered successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
