import mongoose from "mongoose";

const userSignUpSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    city: { type: String, required: true },
    phone: { type: String, required: true },
  },
  { timestamps: true }
);

const UserSignUp = mongoose.models.UserSignUp || mongoose.model("UserSignUp", userSignUpSchema);

export default UserSignUp;
