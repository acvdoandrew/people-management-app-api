// Dependencies
const express = require('express');
const mongoose = require('mongoose');
// Initialize the express app
const app = express();
// Config applications settings
require('dotenv').config();

const { PORT = 4000, DATABASE_URL } = process.env;

// Establishing connection with MongoDB
mongoose.connect(DATABASE_URL);

mongoose.connection
.on('connected' , () => console.log('Connected to MongoDB'))
.on('error' , (error) => console.log('Problem with MongoDB: ' + error.message));
// Mount middleware

// Mount routes
app.get('/', (req, res) => {
    res.send('Welcome to the People Management App');
});

// Tell the app to listen
app.listen(PORT, () => {
    console.log(`Express is listening on port:${PORT}`);
});