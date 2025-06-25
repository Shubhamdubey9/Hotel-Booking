import transporter from "../Config/NodeMailer.js";
import { Booking } from "../Models/Booking.Model.js";
import { Hotel } from "../Models/Hotel.Model.js";
import { Room } from "../Models/room.model.js";
import { User } from "../Models/User.Model.js"; // ✅ THIS LINE
export const checkAvailability = async ({
  checkInDate,
  checkOutDate,
  roomId,
}) => {
  try {
    const bookings = await Booking.find({
      room: roomId, // ✅ correct field in schema
      checkInDate: { $lte: checkOutDate },
      checkOutDate: { $gte: checkInDate },
    });
    return bookings.length === 0;
  } catch (error) {
    console.error(error.message);
    return false;
  }
};

// APi to check Availabiliity of room
// POST / api/ booking/check-availability

export const checkAvailabilityAPI = async (req, res) => {
  try {
    const { roomId, checkInDate, checkOutDate } = req.body;

    const isAvailable = await checkAvailability({
      roomId,
      checkInDate,
      checkOutDate,
    });

    res.json({ success: true, isAvailable });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API to Create a new Booking
// Post / api/booking/book

export const createBooking = async (req, res) => {
  try {
    const { roomId, checkInDate, checkOutDate, guests, paymentMethod } =
      req.body;
    const user = req.user._id;

    const isAvailable = await checkAvailability({
      roomId,
      checkInDate,
      checkOutDate,
    });

    if (!isAvailable) {
      return res.json({
        success: false,
        message: "Room is Not Available",
      });
    }

    const roomData = await Room.findById(roomId).populate("hotel");
    let totalPrice = roomData.pricePerNight;

    const checkin = new Date(checkInDate);
    const checkout = new Date(checkOutDate);
    const nights = Math.ceil((checkout - checkin) / (1000 * 3600 * 24));
    totalPrice *= nights;

    const booking = await Booking.create({
      user,
      room: roomId,
      hotel: roomData.hotel._id,
      guests: +guests, // ✅ correct field name matching the schema
      checkInDate,
      checkOutDate,
      totalPrice,
      paymentMethod: paymentMethod || "Pay at hotel",
    });


    //send email to user
    const dbUser = await User.findById(req.user._id); // fetch full user
    if (!dbUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    
    
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: dbUser.email,
      subject: "Hotel Booking Details",
      html: `
  <h1>Your Booking Details</h1>
  <p>Dear ${dbUser.username},</p>
  <p>Thank you for booking! Here are your details:</p>
  <ul>
    <li><strong>Booking ID:</strong> ${booking._id}</li>
    <li><strong>Hotel Name:</strong> ${roomData.hotel.name}</li>
    <li><strong>Room Type:</strong> ${roomData.roomType}</li>
    <li><strong>No. of Guests:</strong> ${booking.guests}</li>
    <li><strong>Check-In Date:</strong> ${new Date(
      checkInDate
    ).toLocaleDateString()}</li>
    <li><strong>Check-Out Date:</strong> ${new Date(
      checkOutDate
    ).toLocaleDateString()}</li>
    <li><strong>Total Price:</strong> ₹${totalPrice}</li>
  </ul>
  <p>We look forward to welcoming you!</p>
  <p>If you have any questions or need assistance, feel free to contact us.</p>
  <p>Best regards,<br>Your Hotel Team</p>
`,
    };

    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: "Booking Created Successfully",
      booking,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API to get all booking for a users
// GET / api/booking/user

export const getUserBookings = async (req, res) => {
  try {
    const user = req.user._id;
    const booking = await Booking.find({ user })
      .populate("room hotel")
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      bookings: booking,
    });
  } catch (error) {
    res.json({ success: false, message: "failed to fetch booking" });
  }
};

export const getHotelBooking = async (req, res) => {
  try {
    const hotel = await Hotel.findOne({ owner: req.user._id });

    if (!hotel) {
      return res
        .status(404)
        .json({ success: false, message: "No Hotel found" });
    }

    const bookings = await Booking.find({ hotel: hotel._id })
      .populate("room hotel user")
      .sort({ createdAt: -1 });

    const totalBookings = bookings.length;
    const totalRevenue = bookings.reduce(
      (acc, booking) => acc + booking.totalPrice,
      0
    );

    res.json({
      success: true,
      dashBoard: { totalBookings, totalRevenue, bookings },
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch Booking" });
  }
};



// export const stripePayment = async (req, res) => {
//   try {
//     const { booking } = req.body;
//     const bookingData = await Booking.findById(booking)
//     const roomData = await Room.findById(bookingData.room).populate("hotel");
//     const totalPrice = bookingData.totalPrice;
//     const {orgin   }  = req.headers;

//     const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

//     const line_items = [{
//       price_data: {
//         currency: "inr",
//         productData: {
//           name: roomData.hotel.name,
//         },
//         unit_amount: totalPrice * 100,
//       },
//       quantity: 1,
//     }
//   ];
    

//   // Create a Checkout Session
//     const session = await stripeInstance.checkout.sessions.create({
//       line_items,
//       mode: "payment",
//       success_url: `${orgin}/booking/success/${booking}`,
//       cancel_url: `${orgin}/booking/cancel/${booking}`,
//      })
    


//   } catch (error) {
    
//   }
// }