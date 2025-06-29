import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true },
  login_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  profil_picture: { type: String },
  access_token: { type: String },
  status: { type: String, default: "active" },
});

export default model("User", userSchema);
