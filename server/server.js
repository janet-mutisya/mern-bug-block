const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path"); // Add this
const connectDB = require("./config/db");
const bugRoutes = require("./routes/bugRoutes");
const authRoutes = require("./routes/authRoutes");

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);

app.use(cors({
  origin: ['http://localhost:5173', 'https://mern-bug-block-23.onrender.com'],
  credentials: true
}));

app.use(express.json());

// API Routes
app.use("/api/bugs", bugRoutes);
app.use("/api/auth", authRoutes);

// ADD THIS SECTION - Serve React app in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));
  
  // Catch all handler: send back React's index.html file for any non-API routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/dist/index.html"));
  });
}

// Socket.io setup (rest of your code stays the same)
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

app.set("io", io);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));