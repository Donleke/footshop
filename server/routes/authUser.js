import express from "express";
import {
  getUserProfile,
  loginUser,
  registerUser,
} from "../controllers/authUser.js";
import authorize from "../middleware/auth.js";

const router = express.Router();

//register user
router.post("/register", registerUser);

//login user
router.post("/login", loginUser);

//get user profile

router.get("/profile/:id", authorize, getUserProfile);

export default router;
