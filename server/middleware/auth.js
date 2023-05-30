import jwt from "jsonwebtoken";
import User from "../model/User.js";

const authorize = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const isCustomAuth = token.length < 500;
      if (token && isCustomAuth) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");
      } else {
        decoded = jwt.decode(token);
        req.user = decoded?.sub;
      }
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, token failed");
  }
};

export default authorize;
