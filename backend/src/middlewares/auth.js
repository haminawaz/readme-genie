import jwt from "jsonwebtoken";
import { configurations } from "../config/config.js";
import User from "../models/user.js";
const jwtSecret = configurations.jwtSecret;

export const verifyUserToken = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  if (token) {
    token = token.replace(/^Bearer\s+/, "").replace(/^"|"$/g, "");
    jwt.verify(token, jwtSecret, async (err, decoded) => {

      if (err) {
        return res.status(401).json({
          message: "Invalid token or expired",
          data: null,
          error: err,
        });
      }
      const userId = decoded?.user_id;
      const user = await User.findById(userId).select("access_token")
      if (!user) {
        return res.status(404).json({
          message: "User not found",
          response: null,
          error: "User not found",
        });
      }
      req.decoded = user;
      next();
    });
  } else {
    return res.status(401).json({
      message: "Access denied",
      data: null,
      error: "Access denied, authentication token missing.",
    });
  }
};

