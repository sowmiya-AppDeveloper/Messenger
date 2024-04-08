import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { DATABASE } from "./config.js";
import morgan from "morgan";
import authRoutes from "./routes/auth.js";
import http from "http"; // Import the http module
import { Server } from "socket.io";
import { saveMessages, saveWebSocketData } from "./controllers/auth.js";
import { jwtDecode } from "jwt-decode";

import serviceAccount from "./quickchat-d09b8-firebase-adminsdk-zles2-73f031d9b4.json" assert { type: "json" };
import admin from "firebase-admin";
const app = express();

const server = http.createServer(app); // Create an HTTP server using the express app

const io = new Server(server);

// db connection
mongoose.set("strictQuery", false);
mongoose
  .connect(DATABASE)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB CONNECTION ERROR: ", err));

// middlewares
app.use(express.json({ limit: "4mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use(
  "/api/home/bi1466/sowmiya/MessageAssets",
  express.static("/home/bi1466/sowmiya/MessageAssets")
);
//initial backend to connect front end token and backend for notification
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// route middlewares
app.use("/api", authRoutes);

io.on("connection", (socket) => {
  console.log("connection", socket);

  socket.on("chat message", (msg) => {
    console.log("a user connected :D", msg);
    saveWebSocketData(msg, io);
  });
});

// Start the server
const PORT = 8001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
