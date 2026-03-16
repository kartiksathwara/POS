import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderCustomer",
      default: null
    },

    cartItems: [
      {
        title: String,
        price: Number,
        quantity: Number,
        thumbnail: String
      }
    ],

    totalAmount: {
      type: Number,
      required: true
    },

    paymentMethod: {
      type: String,
      enum: ["cash", "card"],
    },

    status: {
      type: String,
      enum: ["Paid", "Failed", "Ongoing", "Unpaid"],
      default: "Unpaid"
    }

  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);