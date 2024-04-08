import mongoose from "mongoose";
const { Schema } = mongoose;

const messageSchema = new Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  recipientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  messageType: {
    type: String,
    enum: ["text", "image", "video"], // Add other valid values as needed
  },
  message: String,
  imageUrl: String,
  timeStamp: {
    type: Date,
    default: Date.now,
  },
  fcmToken: {
    type: String,
    trim: true,
  },
});

export default mongoose.model("Message", messageSchema);
