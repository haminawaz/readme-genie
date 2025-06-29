import { Schema, Types, model } from "mongoose";

const pricingSchema = new Schema({
  user_id: { type: Types.ObjectId, ref: "User", required: true, unique: true },
  max_generated: { type: Number, default: 1 },
  generated: { type: Number, default: 0 },
  plan_name: { type: String },
});

export default model("Pricing", pricingSchema);
