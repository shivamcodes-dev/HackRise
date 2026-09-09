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
    emailId: {
      //Shivam
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
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "problem",
        },
      ],
    },
    password: {
      type: String, //shivam
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
//ye post to jab user ka data delete ho ga to ye bhi delete hoga
userSchema.post("findOneAndDelete", async function (userInfo) {
  if (userInfo) {
    await mongoose.model("submission").deleteMany({ userId: doc._id });
  }
});
//har user ka obj ki tarh bana ke mongodb me store karna
const User = mongoose.model("user", userSchema);

module.exports = User;
