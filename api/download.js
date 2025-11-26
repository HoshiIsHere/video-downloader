export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const url = req.query.url;
  if (!url) return res.json({ success: false, error: "URL tidak ada" });

  try {
    // API downloader stabil (tidak butuh auth)
    const api = `https://ssyoutube.com/api/convert?url=${encodeURIComponent(url)}`;

    const r = await fetch(api);
    const data = await r.json();

    const vid = data?.url?.mp4?.[0]?.url;

    if (!vid) {
      return res.json({ success: false, error: "Tidak ditemukan link video" });
    }

    return res.json({
      success: true,
      video: vid
    });

  } catch (error) {
    return res.json({ success: false, error: "Server error" });
  }
}
