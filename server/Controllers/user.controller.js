


import { User } from "../Models/User.Model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/getDataUri.js";
import cloudinary from "../utils/cloudinary.js";
import { configDotenv } from "dotenv";


// Register
export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    console.log(req.body)

    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Something is Missi",
        success: false,
      });
    }

    const file = req.file;
    if (!file) {
      return res.status(400).json({
        message: "Profile photo is required",
        success: false,
      });
    }

    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exists with this email",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role: role.toLowerCase(),
      profile: {
        profilePhoto: cloudResponse.secure_url,
      },
    });

    return res.status(201).json({
      message: "Account created successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something is Missing",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    if (role.toLowerCase() !== user.role.toLowerCase()) {
      return res.status(400).json({
        message: "Account does not exist with this role",
        success: false,
      });
    }

    const tokenData = { userId: user._id };
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });

    const safeUser = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user: safeUser,
        success: true,
        token,
      });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

// Logout
export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logout Successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

// Update Profile
export const updateProfile = async (req, res) => {
  try {
    const { fullname, bio,phoneNumber } = req.body;
    console.log(req.body);
    if (!fullname || !phoneNumber || !bio ) {
      
      return res.status(400).json({
        message: "Something is Missing",
        success: false,
      });
    }

    const userId = req.user._id;

    let user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        message: "User not found.",
        success: false,
      });
    }

    user.fullname = fullname;
    user.phoneNumber = phoneNumber;
    user.bio = bio;
    await user.save();

    user = {
      _id: user._id,
      fullname: user.fullname,
    
      phoneNumber: user.phoneNumber,
     
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile updated successfully",
      user,
      success: true,
    });
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

// Get User Data
export const getUserData = async (req, res) => {
  try {
    const role = req.user.role;
    const recentSearchCities = req.user.recentSearchCities;

    res.json({
      success: true,
      role,
      recentSearchCities,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Store Recently Searched City
export const storeRecentSearchCities = async (req, res) => {
  try {
    const { recentSearchCity } = req.body;

    if (!recentSearchCity) {
      return res.status(400).json({
        success: false,
        message: "City name is required",
      });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.recentSearchCities = user.recentSearchCities.filter(
      (city) => city.toLowerCase() !== recentSearchCity.toLowerCase()
    );

    user.recentSearchCities.push(recentSearchCity);

    if (user.recentSearchCities.length > 3) {
      user.recentSearchCities = user.recentSearchCities.slice(-3);
    }

    await user.save();

    res.json({
      success: true,
      message: "City added to recent searches",
      recentSearchCities: user.recentSearchCities,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
