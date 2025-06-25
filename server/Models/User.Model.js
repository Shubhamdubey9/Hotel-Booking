import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String, // Changed from Number to String
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String, // Changed from Number to String
      enum: ["user", "hotelowner"], // Role values remain as strings
      required: true,
    },
    recentSearchCities: {
      type: [String], // array of city names
      default: [],
    },

    profile: {
      bio: { type: String, default: "" },

      // Reference to the Company model
      profilePhoto: { type: String, default: "" }, // Default empty string
    },
  },
  { timestamps: true }
);

// Export the model
export const User = mongoose.model("User", userSchema);
