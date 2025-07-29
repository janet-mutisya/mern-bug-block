const express = require('express');
const cors = require ('cors');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const mongoose = require('mongoose');


dotenv.config();
connectDB();

const app = express()
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",   
  credentials: true                  
}));

const PORT = process.env.PORT || 3000;

// routes
app.get('/', (req, res) => {
 res.send('Bug tracker api is running..')
});

// auth routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes); 

// user routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);


// bug routes
const bugRoutes = require('./routes/bugRoutes');
app.use('/api', bugRoutes);

// activity routes 
const activityRoutes= require('./routes/activityRoutes');
app.use('/api', activityRoutes);

// comment routes
const commentRoutes = require('./routes/commentRoutes');
app.use('/api/comments', commentRoutes);

app.listen(PORT, () => {console.log (`Server is running at http://localhost:${PORT}`)});