const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const bugRoutes = require("./routes/bugRoutes");
const authRoutes = require("./routes/authRoutes");

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);

// Proper CORS setup
app.use(cors({
  origin: ['http://localhost:5173', 'https://mern-bug-block-23.onrender.com'],
  credentials: true
}));

// midddleware
app.use(express.json());

// API Routes
app.use("/api/bugs", bugRoutes);
app.use("/api/auth", authRoutes);

// Socket.io setup
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173', 'https://mern-bug-block-23.onrender.com'],
    credentials: true
  }
});

io.on("connection", (socket) => {
  console.log("Client connected: " + socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected: " + socket.id);
  });
});

// Attach io to app for access in controllers (optional)
app.set("io", io);

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));


