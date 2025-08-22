import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import ConnectdB from "./Config/db.js";
import cookieParser from "cookie-parser";
//import { clerkMiddleware } from "@clerk/express";
//import clerkWebhooks from "./Controllers/clerkWebhooks.js";
import userRoute from "./Routes/user.routes.js";
import hotelRouter from "./Routes/hotel.routes.js";
import roomRouter from "./Routes/room.routes.js";
import bookingRouter from "./Routes/booking.routes.js";

dotenv.config();
ConnectdB();
const app = express();
const corsOption = {
  origin: [
    "http://localhost:5173",
    "https://hotel-booking-frontend-0n2t.onrender.com",
  ],
  credentials: true,
};


app.use(cors(corsOption)); // Enable cross orgin resource sharing
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
//app.use(clerkMiddleware());
app.use(cookieParser());
app.use((req, res, next) => {
  if (req.headers.origin) {
    console.log("Request origin:", req.headers.origin);
  } else {
    console.log("Request origin not present");
  }
  next();
});


// API to liisten clerk WebHooks
//app.use("/api/clerk", clerkWebhooks);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/hotel", hotelRouter);
app.use("/api/v1/room", roomRouter);
app.use("/api/v1/booking", bookingRouter);

app.get("/", (req, res) => res.send("Api Is WOrking here Now"));

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
