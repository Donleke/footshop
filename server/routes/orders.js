import express from "express";
import authorize from "../middleware/auth.js";
import {
  cashOrder,
  createOrder,
  getAllOrders,
  getOrderDetail,
  getUserOrders,
  paypalDelivery,
  paypalOrder,
  trackOrders,
} from "../controllers/order.js";

const router = express.Router();

//create order
router.post("/", authorize, createOrder);

//get user orders
router.get("/user", authorize, getUserOrders);
//get orderdetail
router.get("/:id", authorize, getOrderDetail);
//get all orders
router.get("/", authorize, getAllOrders);
//order cashpay status
router.put("/:id/paycash", authorize, cashOrder);
//order paypal pay status
router.put("/:id/paypal", authorize, paypalOrder);
//order paypal deliver status
router.put("/:id/paypaldelivery", authorize, paypalDelivery);
//order track status
router.put("/:id/tracking", authorize, trackOrders);

export default router;
