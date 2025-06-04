import { getAuth } from "@clerk/express";

const requireAuth = (req, res, next) => {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Attach userId to request for controller access
  req.userId = userId;

  next();
};

export default requireAuth;
