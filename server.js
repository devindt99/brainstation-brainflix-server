const express = require('express');
const app = express();
app.use(express.static('public'));
const cors = require('cors');

// Enable CORS for all routes and origins
app.use(cors());

// Your routes and other middleware

// Middleware for logging
app.use((req, res, next) => {
  const now = new Date();
  console.log(`[${now.toISOString()}] ${req.method} ${req.path}`);
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Import the modular router for videos
const videoRoutes = require('./routes/videos'); // Adjust the path as necessary

// Mount the video router on /videos
app.use('/videos', videoRoutes);

app.listen(8080, () => {
  console.log('Server is running on http://localhost:8080');
});
