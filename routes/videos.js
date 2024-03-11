const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid'); // For generating unique IDs
const router = express.Router();

// Define the path to the data file
const dataFilePath = path.join(__dirname, '../data/videos.json');

// Load initial data from file
let videos = loadVideosData();

// Middleware to parse JSON bodies
router.use(express.json());

// Get all videos
router.get('/', (req, res) => {
  res.json(videos);
});

// Add a video
router.post('/', (req, res) => {
  const { title, channel, image, description, views, likes, duration, video, timestamp, comments } = req.body;
  const newVideo = {
    id: uuidv4(),
    title, channel, image, description, views, likes, duration, video, timestamp: timestamp || Date.now(), comments: comments || []
  };

  videos.push(newVideo);
  saveDataToFile(videos); // Save the updated videos array to file

  res.status(201).json(newVideo);
});

// Function to save data to a file
function saveDataToFile(data) {
  try {
    // Using writeFileSync for simplicity; consider async alternatives for production
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Error saving data to file.', err);
  }
}

// Function to load videos data from file
function loadVideosData() {
  try {
    // Read the file synchronously at startup
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error loading videos data from file:', err);
    return []; // Return an empty array in case of error
  }
}

module.exports = router;
