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
    const response = await fetch(`/api/download?url=${encodeURIComponent(url)}`);
    const data = await response.json();

    if (!data.success) {
      statusText.textContent = "Gagal mengambil video.";
      return;
    }

    statusText.textContent = "Video siap di-download!";
    downloadLink.href = data.video;
    downloadLink.style.display = "inline-block";

  } catch (e) {
    statusText.textContent = "Terjadi error pada server.";
    console.error(e);
  }
}
