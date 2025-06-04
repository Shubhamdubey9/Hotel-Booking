import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import ConnectdB from './Config/db.js';
import { clerkMiddleware } from "@clerk/express";
import clerkWebhooks from './Controllers/clerkWebhooks.js';
import userRoutes from "./Routes/userRoutes.js";

dotenv.config();
ConnectdB();
const app = express();
const corsOption = {
  origin: "http://localhost:5173", // Corrected URL
  credentials: true,
};

app.use(cors(corsOption));  // Enable cross orgin resource sharing
app.use(express.json())
app.use(clerkMiddleware());


// API to liisten clerk WebHooks
//app.use("/api/clerk",clerkWebhooks)
app.use("/api/user", userRoutes);
app.get('/',(req,res)=>res.send("Api Is WOrking here "))


const PORT =  process.env.PORT || 3000  

app.listen(PORT, ()=>{
    console.log(`Server is running on Port ${PORT}`); 
})