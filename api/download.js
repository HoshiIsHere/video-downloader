export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const url = req.query.url;
  if (!url) return res.json({ success: false, error: "URL tidak ada" });

  try {
    const api = `https://api.akuari.my.id/downloader?link=${encodeURIComponent(url)}`;

    const r = await fetch(api);
    const data = await r.json();

    // format baru: data.url bisa dalam bentuk array atau string
    const vid =
      data?.url?.[0]?.url ||
      data?.url ||
      data?.result ||
      null;

    if (!vid) {
      return res.json({ success: false, error: "Tidak ditemukan link video" });
    }

    return res.json({
      success: true,
      video: vid,
    });

  } catch (error) {
    return res.json({ success: false, error: "Server error" });
  }
}
