import User from "../Models/User.Model.js";
import * as Clerk from "@clerk/clerk-sdk-node";
import { getAuth } from "@clerk/express";

export const getUserProfile = async (req, res) => {
  const { userId } = getAuth(req);

  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  try {
    const clerkUser = await Clerk.users.getUser(userId);

    const email = clerkUser.emailAddresses[0].emailAddress;
    const image = clerkUser.imageUrl;
    const name = `${clerkUser.firstName} ${clerkUser.lastName}`;

    let user = await User.findById(userId);

    if (!user) {
      user = await User.create({
        _id: userId,
        userName: name,
        email,
        image,
        role: "user",
      });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
