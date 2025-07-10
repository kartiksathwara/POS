import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    id: Number,
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String },
    address: { type: String },
    balance: { type: Number, default: 0 },
    loyaltyPoints: { type: Number, default: 0 },
    notes: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Customer", customerSchema);
