import express from 'express';
import upload from '../Middlware/uploadMiddleware.js'
import { createRoom, getOwnerRooms, getRooms, toggleRoomAvailability } from '../Controllers/room.controller.js';
import isAuthenicated from '../Middlware/isAuthenticated.js';
 
const roomRouter = express.Router();

roomRouter.post("/", upload.array("images", 4), isAuthenicated, createRoom);
roomRouter.get("/",getRooms);
roomRouter.get("/owner",isAuthenicated,getOwnerRooms );
roomRouter.post(
  "/toggle-availability",
  isAuthenicated,
  toggleRoomAvailability
);


export default roomRouter;