import express from "express";
import isAuthenicated from "../Middlware/isAuthenticated.js";
import {
  checkAvailabilityAPI,
  createBooking,
  getHotelBooking,
  getUserBookings,
} from "../Controllers/Booking.controller.js";

const bookingRouter = express.Router();

bookingRouter.post("/check-availability", checkAvailabilityAPI);
bookingRouter.post("/book", isAuthenicated, createBooking);
bookingRouter.post("/user", isAuthenicated, getUserBookings);
bookingRouter.post("/hotel", isAuthenicated, getHotelBooking);

export default bookingRouter;
