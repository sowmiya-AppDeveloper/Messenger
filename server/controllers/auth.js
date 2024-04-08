import User from "../models/user.js";
import express from "express";

import { hashPassword, comparePassword } from "../helpers/auth.js";
import jwt from "jsonwebtoken";
import nanoid from "nanoid";
import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
import { JWT_SECRET } from "../config.js";
import mongoose from "mongoose";
import Message from "../models/message.js";
import { json } from "express";
import multer from "multer";
import { jwtDecode } from "jwt-decode";
import fs from "fs";
import path from "path";
import { Socket } from "socket.io";
import http from "http"; // Import the http module
import { Server } from "socket.io";
import admin from "firebase-admin";

const app = express();

const server = http.createServer(app); // Create an HTTP server using the express app

const io = new Server(server);
dotenv.config();
// sendgrid;
sgMail.setApiKey(process.env.SENDGRID_KEY);
// exports.requireSignIn = expressJwt({
//   secret: process.env.JWT_SECRET,
//   algorithms: ["HS256"],
// });
export const signup = async (req, res) => {
  console.log("HIT SIGNUP");
  try {
    // validation
    const { name, email, password } = req.body;
    if (!name) {
      return res.json({
        error: "Name is required",
      });
    }
    if (!email) {
      return res.json({
        error: "Email is required",
      });
    }
    if (!password || password.length < 6) {
      return res.json({
        error: "Password is required and should be 6 characters long",
      });
    }
    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({
        error: "Email is taken",
      });
    }
    // hash password
    const hashedPassword = await hashPassword(password);

    try {
      const user = await new User({
        name,
        email,
        password: hashedPassword,
      }).save();
      console.log("updated Successfully", user);
      // create signed token
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "3d",
      });

      //   console.log(user);
      const { password, ...rest } = user._doc;
      return res.json({
        status: "success",
        data: rest,
        token,
      });
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
};

export const signin = async (req, res) => {
  console.log("ccccccccccccccccccccccccccc", req.body);
  try {
    const { email, password } = req.body;
    // check if our db has user with that email
    const user = await User.findOne({ email }).maxTimeMS(20000);
    console.log(user);

    if (!user) {
      return res.json({
        error: "No user found",
      });
    }
    // check password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.json({
        error: "Wrong password",
      });
    }
    // create signed token
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
      expiresIn: "3d",
    });

    await User.findByIdAndUpdate(user._id, {
      $set: { fcmToken: req.body.fcmToken },
    });

    user.password = undefined;
    user.secret = undefined;
    user;
    res.json({
      message: "success",
      user,
      token,
    });
  } catch (err) {
    console.log(err);
    console.log("There is an error22", err);
    return res.status(400).send("Error. Try again.");
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  // find user by email
  const user = await User.findOne({ email });
  console.log("USER ===> ", user);
  if (!user) {
    return res.json({ error: "User not found" });
  }
  // generate code
  const resetCode = nanoid(5).toUpperCase();
  // save to db
  user.resetCode = resetCode;
  user.save();
  // prepare email
  const emailData = {
    from: process.env.EMAIL_FROM,
    to: user.email,
    subject: "Password reset code",
    html: "<h1>Your password  reset code is: {resetCode}</h1>",
  };
  // send email
  try {
    const data = await sgMail.send(emailData);
    console.log(data);
    res.json({ ok: true });
  } catch (err) {
    console.log(err);
    res.json({ ok: false });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, password, resetCode } = req.body;
    // find user based on email and resetCode
    const user = await User.findOne({ email, resetCode });
    // if user not found
    if (!user) {
      return res.json({ error: "Email or reset code is invalid" });
    }
    // if password is short
    if (!password || password.length < 6) {
      return res.json({
        error: "Password is required and should be 6 characters long",
      });
    }
    // hash password
    const hashedPassword = await hashPassword(password);
    user.password = hashedPassword;
    user.resetCode = "";
    user.save();
    return res.json({ ok: true });
  } catch (err) {
    console.log(err);
  }
};
export const allUserDetails = async (req, res) => {
  try {
    const loggedInUserId = req.body.id;
    console.log("allUserDetails", loggedInUserId);
    await User.find({
      _id: { $ne: loggedInUserId },
    }).then((users) => {
      let allUserDetails = users;
      console.log("usersAAAAAAAAA", allUserDetails);
      res.status(200).json({ message: "success", allUserDetails });
    });

    // return res.json({ status: "success", allUserDetails });
  } catch (error) {
    console.log("Error retrieving users", err);
    res.status(500).json({ message: "Error retrieving users" });
  }
};
export const getUserDetailsById = async (req, res) => {
  const { id } = req.body;

  try {
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.json({
        error: "No user found",
      });
    }
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
      expiresIn: "3d",
    });
    console.log("getUserDetailsBySaga", user);

    return res.json({ message: "success", user, token });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving users" });
  }
};
export const friendRequest = async (req, res) => {
  try {
    //update my friendRequest to other person
    await User.findByIdAndUpdate(req.body.selectedUserId, {
      $push: { friendRequest: req.body.currentUserId },
    });

    //updated my sendFriendRequests id array by myDetails
    await User.findByIdAndUpdate(req.body.currentUserId, {
      $push: { sendFriendRequests: req.body.selectedUserId },
    });

    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(500).json({ message: "Error sending Request" });
  }
};
//show all the friend request of a particular user

export const getAllFriendRequest = async (req, res) => {
  try {
    const userId = req.body.id;

    const user = await User.findById(userId)
      .populate("friendRequest", "name email image")
      .lean();

    const friendRequestList = user.friendRequest;
    console.log("getUserDetailsById", friendRequestList);

    res.json({ message: "success", friendRequestList });
  } catch (error) {
    console.log("erroe", error);

    res.status(500).json({ message: "Error getting Request" });
  }
};
export const acceptFriendReq = async (req, res) => {
  try {
    console.log("sender", req.body.senderId);

    const { senderId, recipientId } = req.body;

    const sender = await User.findById(senderId);
    const recipient = await User.findById(recipientId);
    console.log("recipient", recipient);

    sender.friends.push(recipientId);
    recipient.friends.push(senderId);

    recipient.friendRequest = recipient.friendRequest.filter(
      (req) => req.toString() !== senderId.toString()
    );
    sender.sendFriendRequests = sender.sendFriendRequests.filter(
      (req) => req.toString() !== recipientId.toString()
    );
    await sender.save();
    await recipient.save();
    res.status(200).json({ message: "Friend Request accepted successfully" });
  } catch (error) {
    console.log("err", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const acceptedFriendsList = async (req, res) => {
  try {
    const user = await User.findById(req.body.id).populate(
      "friends",
      "name email image"
    );

    const acceptedFriends = user.friends;

    res.status(200).json({ message: "success", acceptedFriends });
  } catch (error) {
    console.log("err", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
//get the userdetails to design the chat room header
export const userData = async (req, res) => {
  try {
    const { userId } = req.params;

    const recipientId = await User.findById(userId);
    res.json({ message: "success", recipientId });
  } catch (error) {
    console.log("err", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const saveMessages = async (req, res) => {
  try {
    const storage = multer.diskStorage({
      destination: "/home/bi1466/sowmiya/MessageAssets",
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        cb(null, uniqueSuffix + ext);
      },
    });

    const upload = multer({ storage: storage }).single("imageFile");

    upload(req, res, async (err) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ status: "error", message: "Image upload failed" });
      } else {
        try {
          console.log("acceptedFriends", req);

          const newData = new Message({
            senderId: req.body.senderId,
            recipientId: req.body.recipientId,
            messageType: req.body.messageType,
            message: req.body.messageText,
            timeStamp: new Date(),
            imageUrl:
              req.body.messageType == "image" ? req.file.filename : null,
          });

          await newData.save();
          console.log(
            "messagesrecipientId",
            req.body.senderId,
            req.body.recipientId
          );
          try {
            const messages = await Message.find({
              $or: [
                {
                  senderId: req.body.senderId,
                  recipientId: req.body.recipientId,
                },
                {
                  senderId: req.body.recipientId,
                  recipientId: req.body.senderId,
                },
              ],
            }).populate("senderId", "_id name");

            io.emit("chat message", messages);
          } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Internal Server Error" });
          }
          // for (const [key, value] of formData) {
          //   switch (key) {
          //     case "senderId":
          //       senderId = value;
          //       break;
          //     case "recipientId":
          //       recipientId = value;
          //       break;
          //     case "messageType":
          //       messageType = value;
          //       break;
          //     case "messageText":
          //       messageText = value;
          //       break;
          //     // Add more cases if needed
          //   }
          // }
          // const newData = new Message({
          //   senderId,
          //   recipientId,
          //   messageType,
          //   message: messageText,
          //   timeStamp: new Date(),
          //   imageUrl: messageType == "image",
          // });
          // await newData.save();
          // if (messageType == "image") {
          //   res.json({
          //     status: "success",
          //     message: "Image uploaded successfully",
          //   });
          // } else {
          //   res.json({
          //     status: "success",
          //     message: "Text uploaded successfully",
          //   });
          // }
        } catch (error) {
          // Handle errors here
          console.error(error);
          res.status(500).json({
            status: "error",
            message: "Internal server error",
          });
        }
      }
    });
  } catch (error) {
    console.log("err", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//to fetch the messages between two users in the chatRoom
export const getMessages = async (req, res) => {
  try {
    const { senderId, recipientId } = req.params;
    const messages = await Message.find({
      $or: [
        { senderId: senderId, recipientId: recipientId },
        { senderId: recipientId, recipientId: senderId },
      ],
    }).populate("senderId", "_id name");

    res.json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const saveWebSocketData = async (data, io) => {
  try {
    // const imageFile = data._parts.find((part) => part[0] === "imageFile")[1];

    // const destination = "/home/bi1466/sowmiya/MessageAssets";

    // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // const ext = path.extname(imageFile.name);
    // const filename = `${uniqueSuffix}${ext}`;

    // const destinationPath = path.join(destination, filename);

    // const localFilePath = imageFile.uri.replace(/^file:\/\//, "");
    // console.log("localFilePath", localFilePath);
    // // const base64String = fs.readFileSync(localFilePath, { encoding: "base64" });

    // const base64String = Buffer.from(localFilePath).toString("base64");
    // console.log("base64String", base64String);

    // fs.writeFile(destinationPath, base64String, "base64", (err) => {
    //   if (err) {
    //     console.error("Error saving image:", err);
    //     return;
    //   }

    //   console.log(
    //     "Image saved successfully at:",
    //     destinationPath,
    //     base64String,
    //     "base64"
    //   );
    // });
    console.log("ppppppppppppppppppppppppppppp", data._parts);

    try {
      let senderId, recipientId, messageType, messageText, fcmToken;

      const formData = data._parts;

      for (const [key, value] of formData) {
        switch (key) {
          case "senderId":
            const decoded = jwtDecode(value);
            const user = decoded._id;
            console.log("saveWebSocketData", user);

            senderId = user;
            break;
          case "recipientId":
            recipientId = value;
            break;
          case "messageType":
            messageType = value;
            break;
          case "messageText":
            messageText = value;
            break;
          case "fcmToken":
            fcmToken = value;
            break;
          // Add more cases if needed
        }
      }

      const newData = new Message({
        senderId,
        recipientId,
        messageType,
        message: messageText,
        timeStamp: new Date(),
        imageUrl: messageType == "image",
        fcmToken,
      });

      await newData.save();

      try {
        const messages = await Message.find({
          $or: [
            { senderId: senderId, recipientId: recipientId },
            { senderId: recipientId, recipientId: senderId },
          ],
        }).populate("senderId", "_id name");

        console.log("newOneGETNOTIFI", fcmToken);
        admin.messaging().send({
          token: fcmToken,
          android: {
            notification: {
              title: messages[0].senderId.name,
              body: messageText,
            },
          },
        });

        io.emit("chat message", messages);
      } catch (error) {
        console.log(error);
        //res.status(500).json({ error: "Internal Server Error" });
      }
    } catch (error) {
      console.log(error);
      //res.status(500).json({ error: "Internal Server Error" });
    }
  } catch (error) {
    console.log("errorrrrrrrrrrr", error);
    //res.status(500).json({ message: "Internal server error" });
  }
};
//endpoint to delete the messages!

export const deleteMessages = async (req, res) => {
  try {
    const { messages } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ message: "invalid req body!" });
    }

    await Message.deleteMany({ _id: { $in: messages } });

    res.json({ message: "Message deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server" });
  }
};

export const sentReqFriendList = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId)
      .populate("sendFriendRequests", "name email image")
      .lean();
    console.log("sentFriendRequests11111", user.sendFriendRequests);

    const sentFriendRequests = user.sendFriendRequests;
    console.log("sentFriendRequests", sentFriendRequests);
    res.json(sentFriendRequests);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server" });
  }
};
export const getFriendsList = async (req, res) => {
  try {
    const { userId } = req.params;

    User.findById(userId)
      .populate("friends")
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        const friendIds = user.friends.map((friend) => friend._id);

        res.status(200).json(friendIds);
      });
  } catch ({ error }) {
    console.log(error);
    res.status(500).json({ error: "Internal Server" });
  }
};
