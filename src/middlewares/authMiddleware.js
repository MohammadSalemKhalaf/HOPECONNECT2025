import jwt from "jsonwebtoken";
import pool from "../config/database.js";
import dotenv from "dotenv";

dotenv.config();

const authMiddleware = (allowedRoles = []) => {
  if (typeof allowedRoles === "string") {
    allowedRoles = [allowedRoles];
  }

  return async (req, res, next) => {
    try {
      const token = req.header("Authorization")?.replace("Bearer ", "");

      if (!token) {
        return res
          .status(401)
          .json({ message: "Access denied: Token is required" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const [users] = await pool.query(
        "SELECT id, full_name, email, role FROM user WHERE id = ?",
        [decoded.id]
      );

      if (!users.length) {
        return res.status(404).json({ message: "User not found" });
      }

      const user = users[0];

      if (allowedRoles.length && !allowedRoles.includes(user.role)) {
        return res.status(403).json({ message: "Insufficient permissions" });
      }

      req.user = user;
      next();
    } catch (error) {
      console.error("Authentication error:", error);
      return res.status(401).json({ message: "Invalid token" });
    }
  };
};

export default authMiddleware;
