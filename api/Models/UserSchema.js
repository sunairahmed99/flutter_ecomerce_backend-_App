import mongoose from "mongoose";
import validator from "validator";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name required"],
  },
  email: {
    type: String,
    required: [true, "Email required"],
    validate: {
      validator: validator.isEmail,
      message: "Invalid email address",
    },
  },
  phone: {
    type: Number,
    required: [true, "Number is required"],
  },
  password: {
    type: String,
    required: [true, "Password required"],
    minlength: 4,
  },
  role: {
    type: String,
    default: "user",
  },
  isactive: {
    type: String,
    default: "active",
  },
  verifycode: {
    type: Number,
  },
  verifiedstatus: {
    type: Boolean,
    default: false,
  },
  resetpasscode: {
    type: String,
  },
  resetpasscodeexp: {
    type: Date,
  },
  fcmTokens: { type: [String], default: [] },
});

export default mongoose.models.Userss || mongoose.model("Userss", UserSchema);
