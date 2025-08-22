import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import ConnectdB from "./Config/db.js";
import cookieParser from "cookie-parser";
import userRoute from "./Routes/user.routes.js";
import hotelRouter from "./Routes/hotel.routes.js";
import roomRouter from "./Routes/room.routes.js";
import bookingRouter from "./Routes/booking.routes.js";

dotenv.config();
ConnectdB();
const app = express();


const allowedOrigins = [
  "http://localhost:5173",
  "https://hotel-booking-frontend-0n2t.onrender.com",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        
        return callback(null, true);
      }
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use((req, res, next) => {
  console.log("Request origin:", req.headers.origin || "not present");
  next();
});


app.use("/api/v1/user", userRoute);
app.use("/api/v1/hotel", hotelRouter);
app.use("/api/v1/room", roomRouter);
app.use("/api/v1/booking", bookingRouter);

app.get("/", (req, res) => res.send("API is working!"));


const PORT = process.env.PORT || 8000; 

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
