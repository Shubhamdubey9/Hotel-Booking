import mongoose from "mongoose";

const ConnectdB = async () => {
  try {
    const conn = await mongoose.connect(
      `${process.env.MONGODB_URI}/Hotel-Booking`
    );

    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    process.exit(1); // Exit the app if DB connection fails
  }
};

export default ConnectdB;
 