import dotenv from "dotenv";
dotenv.config();

import http from "http";

import { Server } from "socket.io";

import app from "./app";

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join-ticket", (ticketId) => {
    socket.join(ticketId);

    console.log(`Socket joined ticket room: ${ticketId}`);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
