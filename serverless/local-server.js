require('dotenv').config();
const express = require('express');
const chatHandler = require('./api/chat');

const app = express();

// Parse JSON bodies
app.use(express.json());

// Forward requests to the Vercel handler
// Express req/res are compatible with Vercel's req/res for basic JSON body/status
app.all('/api/chat', (req, res) => {
  chatHandler(req, res);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Local development server running on http://localhost:${PORT}`);
});
