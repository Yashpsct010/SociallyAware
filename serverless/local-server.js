const express = require('express');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Only load dotenv if we are NOT in production
if (process.env.NODE_ENV !== 'production') {
  try {
    require('dotenv').config();
  } catch (e) {
    console.log('No .env file found, skipping...');
  }
}

const app = express();
app.use(express.json());

// --- Health Check (Required by some cloud providers) ---
app.get('/_health', (req, res) => res.status(200).send('OK'));

// --- Chat API Logic ---
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) return res.status(500).json({ error: 'GEMINI_API_KEY missing' });

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

    const systemPrompt = "You are an Indian Election Expert. Answer concisely.";
    const formattedHistory = (history || []).map(m => `${m.isBot ? 'Expert' : 'User'}: ${m.text}`).join('\n');
    const prompt = `${systemPrompt}\n\nChat History:\n${formattedHistory}\nUser: ${message}\nExpert:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    res.json({ text: response.text() });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ 
      error: 'Failed to generate response',
      details: error.message 
    });
  }
});

// --- Static File Serving ---
const distPath = path.resolve(__dirname, 'dist');
app.use(express.static(distPath));

// SPA Fallback
app.get('*', (req, res) => {
  const indexPath = path.join(distPath, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      // If we can't find index.html, don't crash, just send a 404
      res.status(404).send(`Static assets not found at ${indexPath}`);
    }
  });
});

const PORT = process.env.PORT || 8080;
// Listen on all interfaces
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server successfully started on port ${PORT}`);
});
