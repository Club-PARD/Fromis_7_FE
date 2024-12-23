const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');  // CORS 미들웨어

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.post('/api/get-og-data', async (req, res) => {
  const { url } = req.body;

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const ogTitle = $('meta[property="og:title"]').attr('content');
    const ogDescription = $('meta[property="og:description"]').attr('content');
    const ogImage = $('meta[property="og:image"]').attr('content');
    const ogUrl = $('meta[property="og:url"]').attr('content');

    res.json({
      title: ogTitle || 'No title found',
      description: ogDescription || 'No description found',
      image: ogImage || 'No image found',
      url: ogUrl || 'No URL found',
    });
  } catch (error) {
    console.error('Error fetching OG data:', error);
    res.status(500).json({ error: 'Failed to fetch OG data' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
