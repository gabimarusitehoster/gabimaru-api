const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const PORT = process.env.PORT || 3000;

// Root: Professional Landing Page
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Gabimaru Bot API</title>
        <style>
          body {
            font-family: 'Segoe UI', sans-serif;
            background: #1e1e2f;
            color: #f4f4f4;
            padding: 2rem;
            margin: 0;
          }
          h1 {
            color: #ff3d3d;
            font-size: 2.5rem;
            margin-bottom: 0.5rem;
          }
          p {
            color: #ccc;
            font-size: 1rem;
          }
          .routes {
            margin-top: 2rem;
          }
          .route {
            background: #2c2c3d;
            border-left: 5px solid #ff3d3d;
            padding: 1rem;
            margin-bottom: 1rem;
            border-radius: 6px;
          }
          .route h2 {
            margin: 0;
            font-size: 1.2rem;
            color: #ff7878;
          }
          .route code {
            background: #111;
            padding: 0.2rem 0.4rem;
            border-radius: 4px;
            font-size: 0.9rem;
            display: block;
            margin-top: 5px;
            color: #a0e0ff;
          }
        </style>
      </head>
      <body>
        <h1>Gabimaru Bot API</h1>
        <p>Open API endpoints for your WhatsApp/Telegram bots</p>
        <div class="routes">
          <div class="route">
            <h2>/quote</h2>
            <code>Returns a random motivational quote</code>
          </div>
          <div class="route">
            <h2>/roast</h2>
            <code>Returns a savage roast insult</code>
          </div>
          <div class="route">
            <h2>/pickup</h2>
            <code>Returns a flirty pickup line</code>
          </div>
          <div class="route">
            <h2>/animequote</h2>
            <code>Returns a random anime quote with character & anime</code>
          </div>
        </div>
      </body>
    </html>
  `);
});

// /quote endpoint
app.get('/quote', async (req, res) => {
  try {
    const { data } = await axios.get('https://type.fit/api/quotes');
    const random = data[Math.floor(Math.random() * data.length)];
    res.json({
      quote: random.text,
      author: random.author || 'Unknown',
      status: 'success',
      creator: 'Gabimaru'
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Failed to fetch quote' });
  }
});

// /roast endpoint
app.get('/roast', async (req, res) => {
  try {
    const { data } = await axios.get('https://www.insultgenerator.org/');
    const $ = cheerio.load(data);
    const insult = $('#random-insult').text().trim();
    res.json({
      roast: insult,
      status: 'success',
      creator: 'Gabimaru'
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Failed to fetch roast' });
  }
});

// /pickup endpoint
app.get('/pickup', async (req, res) => {
  try {
    const { data } = await axios.get('https://www.pickupline.net/random/');
    const $ = cheerio.load(data);
    const pickup = $('.pickup-line .elementor-heading-title').first().text().trim();

    res.json({
      pickup,
      status: 'success',
      creator: 'Gabimaru'
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Failed to fetch pickup line' });
  }
});

// /bibleverse endpoint
app.get('/bibleverse', async (req, res) => {
  try {
    const { data } = await axios.get('https://dailyverses.net/random-bible-verse');
    const $ = cheerio.load(data);

    const verse = $('.bibleVerse').text().trim();
    const reference = $('.bibleVerse .verse').text().trim();

    res.json({
      verse: verse.replace(reference, '').trim(),
      reference: reference,
      status: 'success',
      creator: 'Gabimaru'
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch Bible verse',
    });
  }
});

// /animequote endpoint
app.get('/animequote', async (req, res) => {
  try {
    const { data } = await axios.get('https://animechan.vercel.app/api/random');
    res.json({
      quote: data.quote,
      character: data.character,
      anime: data.anime,
      status: 'success',
      creator: 'Gabimaru'
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Failed to fetch anime quote' });
  }
});

// Prevent Render app from sleeping (every 5 minutes)
setInterval(() => {
  axios.get('https://gabimaru-site-api.onrender.com'); // Replace with your actual Render domain
}, 5 * 60 * 1000);

app.listen(PORT, () => {
  console.log(`Gabimaru Bot API running on port ${PORT}`);
});
