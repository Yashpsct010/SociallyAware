require('dotenv').config();
const express = require('express');
const path = require('path');
const chatHandler = require('./api/chat');

const app = express();

// Parse JSON bodies
app.use(express.json());

// 1. API Routes
app.all('/api/chat', (req, res) => {
  try {
    chatHandler(req, res);
  } catch (err) {
    console.error('Chat Handler Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 2. Serve Static Files
// Use an absolute path that works in the Docker container
const distPath = path.resolve(__dirname, 'dist');
console.log('Serving static files from:', distPath);

app.use(express.static(distPath));

// 3. SPA Fallback
app.get('*', (req, res) => {
  const indexPath = path.join(distPath, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error('Error sending index.html:', err);
      res.status(404).send('Frontend not built correctly. Please check build logs.');
    }
  });
});

const PORT = process.env.PORT || 8080;
// CRITICAL: Listen on 0.0.0.0 for Cloud Run
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is listening on 0.0.0.0:${PORT}`);
});
