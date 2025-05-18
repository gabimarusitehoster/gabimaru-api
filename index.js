const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Gabimaru\'s Free JSON API',
    endpoints: ['/quote', '/animequote']
  });
});

// QUOTE endpoint
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

// ANIMEQUOTE endpoint
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

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});
