import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    cartItems: Array,
    totalAmount: Number,
    paymentMethod: String,
    status: String,
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);