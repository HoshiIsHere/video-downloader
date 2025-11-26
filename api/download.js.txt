// api/download.js (untuk Vercel serverless)
const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const url = req.query.url || (req.body && req.body.url);
  if (!url) return res.status(400).json({ error: 'Missing url param' });

  try {
    // API downloader publik (legal)
    const apiEndpoint = 'https://ytdlapi.xyz/api?url=' + encodeURIComponent(url);

    const r = await fetch(apiEndpoint);
    if (!r.ok) return res.status(500).json({ error: 'API pihak ketiga error' });

    const data = await r.json();

    const files = (data && data.files)
      ? data.files
      : [{ url: data.download || data.link, quality: data.quality || 'default', type: data.type || '' }];

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json({ files });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
