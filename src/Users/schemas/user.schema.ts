import * as mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: "user", enum: ["user", "admin"] }
})