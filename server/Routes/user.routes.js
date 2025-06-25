import express from "express";
import {
  login,
  logout,
  register,
  updateProfile,
  getUserData,
  storeRecentSearchCities,
} from "../Controllers/user.controller.js";
import isAuthenicated from "../Middlware/isAuthenticated.js";
import { singleUpload } from "../Middlware/multer.js";

const router = express.Router();

// Register with profile photo upload
router.route("/register").post(singleUpload, register);

// Login and logout
router.route("/login").post(login);
router.route("/logout").get(logout);

// Update profile (requires auth + image upload)
router
  .route("/profile/update")
  .post(isAuthenicated, singleUpload, updateProfile);

// Get user data (role and recentSearchCities)
router.route("/me").get(isAuthenicated, getUserData);

// Store recently searched city
router
  .route("/store-recent-city")
  .post(isAuthenicated, storeRecentSearchCities);

export default router;
