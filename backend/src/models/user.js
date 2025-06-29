import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  anonymous: { type: Boolean, default: false },
});

export default model('User', userSchema);
