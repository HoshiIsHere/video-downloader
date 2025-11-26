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
    // API bebas watermark (contoh: savefrom, snapinsta, snaptik, dll)
    // Gunakan proxy API agar response tetap JSON valid
    const response = await fetch(`https://api.akuari.my.id/downloader/all?link=${encodeURIComponent(url)}`);

    const data = await response.json();

    if (!data || !data.url) {
      statusText.textContent = "Gagal mengambil link, coba URL lain!";
      return;
    }

    statusText.textContent = "Video siap di-download!";
    downloadLink.href = data.url;
    downloadLink.style.display = "inline-block";

  } catch (err) {
    statusText.textContent = "Kesalahan: Tidak dapat mengambil video.";
    console.error(err);
  }
}
