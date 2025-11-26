async function startDownload() {
  const url = document.getElementById("urlInput").value;
  const resultBox = document.getElementById("resultBox");
  const statusText = document.getElementById("statusText");
  const downloadLink = document.getElementById("downloadLink");

  if (!url.trim()) {
    alert("Masukkan URL dulu, Bang!");
    return;
  }

  resultBox.style.display = "block";
  statusText.textContent = "Mengambil link download...";

  try {
    // API Downloader yang stabil (server gratis + JSON valid)
    const api = `https://ssyoutube.com/api/convert?url=${encodeURIComponent(url)}`;

    const res = await fetch(api);
    const data = await res.json();

    if (!data || !data.url?.mp4) {
      statusText.textContent = "Gagal mengambil link video.";
      return;
    }

    // mp4 kualitas tertinggi
    const videoURL = data.url.mp4[0].url;

    statusText.textContent = "Video siap di-download!";
    downloadLink.href = videoURL;
    downloadLink.download = "video.mp4";
    downloadLink.style.display = "inline-block";

  } catch (err) {
    statusText.textContent = "Kesalahan saat mengambil video.";
    console.error(err);
  }
}
