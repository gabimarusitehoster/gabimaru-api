const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// Homepage
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Gabimaru\'s Free JSON API',
    endpoints: ['/quote', '/animequote']
  });
});

// Quote endpoint
app.get('/quote', async (req, res) => {
  try {
    const { data } = await axios.get('https://api.quotable.io/random');
    res.json({
      quote: data.content,
      author: data.author,
      status: 'success',
      creator: 'Gabimaru'
    });
  } catch {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch quote'
    });
  }
});

// Anime Quote endpoint
app.get('/animequote', async (req, res) => {
  try {
    const { data } = await axios.get('https://animechan.xyz/api/random');
    res.json({
      quote: data.quote,
      character: data.character,
      anime: data.anime,
      status: 'success',
      creator: 'Gabimaru'
    });
  } catch {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch anime quote'
    });
  }
});

// Self-ping every 5 minutes
setInterval(() => {
  axios.get('https://gabimaru-site-api.onrender.com').catch(() => {});
}, 5 * 60 * 1000); // 5 minutes

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});
