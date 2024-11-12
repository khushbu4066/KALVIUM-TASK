// server.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files (React frontend)
app.use(express.static(path.join(__dirname, "client/build")));

// Room data structure
let rooms = {};

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("joinRoom", ({ roomId, role }) => {
    socket.join(roomId);
    if (!rooms[roomId]) rooms[roomId] = { page: 1 };

    socket.emit("pageChanged", rooms[roomId].page);

    // Handle admin page changes
    socket.on("changePage", (newPage) => {
      if (role === "admin") {
        rooms[roomId].page = newPage;
        io.to(roomId).emit("pageChanged", newPage);
      }
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
