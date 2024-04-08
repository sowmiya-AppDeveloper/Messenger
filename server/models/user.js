import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 64,
    },
    fcmToken: {
      type: String,
      trim: true,
    },
    friendRequest: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    image: {
      type: String,
      //require: true,
    },
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    sendFriendRequests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("users", userSchema);
