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
app.use(cors());


const PORT = process.env.PORT || 3000;

// routes
app.get('/', (req, res) => {
 res.send('Bug tracker api is running..')
});

// auth routes
const authRoute = require('./routes/authRoutes');
app.use('/api', authRoute);

// user routes
const user = require('./models/user');
app.use('/api', user);

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