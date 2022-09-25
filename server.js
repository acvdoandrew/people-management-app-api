// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const cors = require('cors');
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
    image: {
        type: String,
        default: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'
    },
    title: String
}, {timestamps: true});

const People = mongoose.model('People', peopleSchema);

// Mount middleware
// app.use(express.urlencoded({ extended: false })) // intercepts incoming form data and turns it into req.body
app.use(express.json()); // This middleware intercepts incoming json requests bodies and turns them into req.body
app.use(logger('dev'));

app.use(cors()); // This sets the access-control-allow-origin to *
// This means that all domains can request data from the server
//without getting blocked by the browser


// Mount routes
app.get('/', (req, res) => {
    res.send('Welcome to the People Management App');
});

// FULL CRUD ROUTES

// INDEX Route
app.get('/api/people', async (req, res) => {
    try {
        res.status(200).json(await People.find({}));
    } catch (error) {
        console.log(error);
        res.status(400).json({'error': 'bad request'});
    }
});

// CREATE Route
app.post('/api/people', async (req, res) => {
    try {
        res.status(201).json(await People.create(req.body));
    } catch (error) {
        console.log(error);
        res.status(400).json({'error': 'bad request'});
    }
});

// UPDATE Route
app.put('/api/people/:id', async (req, res) => {
    try {
        res.status(200).json(await People.findByIdAndUpdate(
            req.params.id, 
            req.body,
            { new: true }
        ));
        } catch (error) {
            console.log(error);
            res.status(400).json({'error': 'bad request'});
    }
});

// DELETE Route
app.delete('/api/people/:id', async (req, res) => {
    try {
        res.status(200).json(await People.findByIdAndDelete(req.params.id))
    } catch (error) {
        console.log(error);
        res.status(400).json({'error': 'bad request'});
    }
});

// Test Route to see how a MERN Stack App works
app.get('/api/skills', (req, res) => {
    // Fake database
    const skills = [
        {
            skill: 'JavaScript',
            level: '5'
        },
        {
            skill: 'HTML',
            level: '5'
        },
        {
            skill: 'CSS',
            level: '5'
        },
    ];
    res.status(200).json(skills);
});

// Tell the app to listen
app.listen(PORT, () => {
    console.log(`Express is listening on port:${PORT}`);
});