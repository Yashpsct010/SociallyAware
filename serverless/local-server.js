require('dotenv').config();
const express = require('express');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(express.json());

// --- Chat API Logic (Moved here for stability) ---
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({ error: 'GEMINI_API_KEY missing' });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Use stable model name

    const systemPrompt = `You are an Election Expert for India. Only answer election/voting questions. Refuse others with: "I am an Election Expert assistant. I can only answer questions related to the Indian election process and voting procedures."`;
    const formattedHistory = (history || []).map(m => `${m.isBot ? 'Expert' : 'User'}: ${m.text}`).join('\n');
    const prompt = `${systemPrompt}\n\nChat History:\n${formattedHistory}\nUser: ${message}\nExpert:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    res.json({ text: response.text() });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Failed to generate response' });
  }
});

// --- Static File Serving ---
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

// SPA Fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'), (err) => {
    if (err) res.status(404).send('Frontend not found');
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on 0.0.0.0:${PORT}`);
});
