import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    orderItems: [
      {
        title: { type: String, required: true },
        slug: { type: String, required: true },
        quantity: { type: Number, required: true },
        images: { type: [String], required: true },
        price: { type: Number, required: true },
      },
    ],
    shippingDetails: {
      address: { type: String, required: true },
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      state: { type: String, required: true },
      phone: { type: Number },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      required: true,
      default: "Cash",
    },
    status: {
      type: Number,
      default: 0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);
