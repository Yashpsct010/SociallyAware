require('dotenv').config();
const express = require('express');
const path = require('path');
const chatHandler = require('./api/chat');

const app = express();

// Parse JSON bodies
app.use(express.json());

// 1. API Routes
app.all('/api/chat', (req, res) => {
  chatHandler(req, res);
});

// 2. Serve Static Files (The Frontend)
// In production, the 'dist' folder will be copied into the backend directory
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

// 3. SPA Fallback
// For any route that isn't an API call, serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Unified server running on port ${PORT}`);
});
