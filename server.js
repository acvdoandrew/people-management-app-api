// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
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

// Set up model
const peopleSchema = new mongoose.Schema({
    name: String,
    image: String,
    title: String
}, {timestamps: true});

const People = mongoose.model('People', peopleSchema);

// Mount middleware
// app.use(express.urlencoded({ extended: false })) // intercepts incoming form data and turns it into req.body
app.use(express.json()); // This middleware intercepts incoming json requests bodies and turns them into req.body
app.use(logger('dev'));


// Mount routes
app.get('/', (req, res) => {
    res.send('Welcome to the People Management App');
});

// Tell the app to listen
app.listen(PORT, () => {
    console.log(`Express is listening on port:${PORT}`);
});