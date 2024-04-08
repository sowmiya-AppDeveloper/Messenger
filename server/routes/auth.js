import express from "express";

const router = express.Router();

// controllers

import {
  forgotPassword,
  resetPassword,
  signin,
  signup,
  getUserDetailsById,
  allUserDetails,
  friendRequest,
  getAllFriendRequest,
  acceptFriendReq,
  acceptedFriendsList,
  saveMessages,
  userData,
  getMessages,
  deleteMessages,
  sentReqFriendList,
  getFriendsList,
} from "../controllers/auth.js";

router.get("/", (req, res) => {
  return res.json({
    data: "hello world from kaloraat auth API",
  });
});
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/allUserDetails", allUserDetails);
router.post("/getUserDetailsById", getUserDetailsById);
router.post("/friend_request", friendRequest);
router.post("/getAllFriendRequest", getAllFriendRequest);
router.post("/acceptFriendRequest", acceptFriendReq);
router.post("/acceptedFriendsList", acceptedFriendsList);
router.post("/messages", saveMessages);
router.get("/user/:userId", userData);
router.get("/messages/:senderId/:recipientId", getMessages);
router.post("/deleteMessages", deleteMessages);
router.get("/friend-requests/sent/:userId", sentReqFriendList);
router.get("/friends/:userId", getFriendsList);
export default router;
