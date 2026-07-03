const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 20,
    },
    lastName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 20,
    },
    emailid: {
      type: String,
      //filed dena compulsory
      required: true,
      //filed duplicate nhi hoga
      unique: true,
      trim: true,
      lowercase: true,
      immutable: true,
    },
    age: {
      type: Number,
      min: 6,
      max: 80,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    problemSolved: {
      type: [String],
    },
    password: {
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
//har user ka obj ki tarh bana ke mongodb me store karna
const User = mongoose.model("user", userSchema);

module.exports = User;
