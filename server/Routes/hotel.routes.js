import express from 'express';
import isAuthenicated from '../Middlware/isAuthenticated.js';
import { registerHotel } from '../Controllers/hotel.controller.js';
const hotelRouter =  express.Router();

hotelRouter.post('/',isAuthenicated,registerHotel)
export default hotelRouter;