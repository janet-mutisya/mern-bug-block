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
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

// Middleware
app.use(cors({
  origin: "http://localhost:5173",  
  credentials: true                 
}));
        

app.use(express.json());

// Routes
app.use("/api/bugs", bugRoutes);
app.use("/api/auth", authRoutes);

// Socket setup
io.on("connection", (socket) => {
  console.log("Client connected: " + socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected: " + socket.id);
  });
});

// Attach io to app
app.set("io", io);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

