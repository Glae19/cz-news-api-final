import axios from 'axios';

export default async function handler(req, res) {
  // ✅ Set CORS headers here
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // ✅ If it's a preflight request, end it
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q: 'crypto OR cryptocurrency OR bitcoin OR ethereum',
        from: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
        to: new Date().toISOString().slice(0, 10),
        sortBy: 'publishedAt',
        language: 'en',
        pageSize: 30,
        apiKey: process.env.NEWS_API_KEY,
      },
    });

    res.status(200).json(response.data.articles || []);
  } catch (err) {
    console.error('API error:', err.message);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
}
