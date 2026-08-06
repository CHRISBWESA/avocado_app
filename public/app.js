const SERVER_URL = "https://avocado-app-1.onrender.com/predict_base64";

const cameraBtn = document.getElementById("cameraBtn");
const galleryBtn = document.getElementById("galleryBtn");
const fileInput = document.getElementById("fileInput");
const preview = document.getElementById("preview");
const placeholder = document.getElementById("placeholder");
const previewContainer = document.getElementById("previewContainer");
const statusBox = document.getElementById("statusBox");
const resultBox = document.getElementById("resultBox");
const resultBadge = document.getElementById("resultBadge");
const confidence = document.getElementById("confidence");
const description = document.getElementById("description");

function showStatus(show) {
  statusBox.style.display = show ? "flex" : "none";
}

function showResult(data) {
  resultBox.style.display = "block";
  resultBadge.textContent = data.hali;
  resultBadge.className = "badge2 " + (data.code === "iva" ? "badge-ripe" : "badge-unripe");
  confidence.textContent = "Confidence: " + data.uhakika;
  description.textContent = data.maelezo;
}

function processImage(file) {
  const reader = new FileReader();
  reader.onload = function(e) {
    const base64 = e.target.result.split(",")[1];
    preview.src = e.target.result;
    preview.style.display = "block";
    placeholder.style.display = "none";

    showStatus(true);
    resultBox.style.display = "none";

    fetch(SERVER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: base64 }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Server error");
        return res.json();
      })
      .then((data) => showResult(data))
      .catch((err) => alert("Error: " + err.message))
      .finally(() => showStatus(false));
  };
  reader.readAsDataURL(file);
}

cameraBtn.addEventListener("click", () => {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    alert("Camera not supported on this device");
    return;
  }
  navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
    .then((stream) => {
      const video = document.createElement("video");
      video.srcObject = stream;
      video.play();
      video.setAttribute("autoplay", "");
      video.setAttribute("playsinline", "");

      const canvas = document.createElement("canvas");
      canvas.width = 1024;
      canvas.height = 1024;

      const capture = () => {
        stream.getTracks().forEach((t) => t.stop());
        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0, 1024, 1024);
        canvas.toBlob((blob) => {
          processImage(new File([blob], "capture.jpg", { type: "image/jpeg" }));
        }, "image/jpeg", 0.9);
      };

      const overlay = document.createElement("div");
      overlay.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);display:flex;align-items:center;justify-content:center;z-index:1000;flex-direction:column;";
      const videoEl = document.createElement("video");
      videoEl.srcObject = stream;
      videoEl.play();
      videoEl.setAttribute("autoplay", "");
      videoEl.setAttribute("playsinline", "");
      videoEl.style.cssText = "max-width:90%;max-height:60%;border-radius:12px;";
      const captureBtn = document.createElement("button");
      captureBtn.textContent = "📷 Capture";
      captureBtn.style.cssText = "margin-top:20px;padding:14px 32px;font-size:18px;background:#27ae60;color:#fff;border:none;border-radius:12px;cursor:pointer;";
      const closeBtn = document.createElement("button");
      closeBtn.textContent = "✕ Close";
      closeBtn.style.cssText = "margin-top:10px;padding:10px 24px;font-size:14px;background:#ef4444;color:#fff;border:none;border-radius:12px;cursor:pointer;";
      overlay.appendChild(videoEl);
      overlay.appendChild(captureBtn);
      overlay.appendChild(closeBtn);
      document.body.appendChild(overlay);

      captureBtn.addEventListener("click", capture);
      closeBtn.addEventListener("click", () => {
        stream.getTracks().forEach((t) => t.stop());
        overlay.remove();
      });
    })
    .catch(() => alert("Camera access denied"));
});

galleryBtn.addEventListener("click", () => {
  fileInput.click();
});

fileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) processImage(file);
  fileInput.value = "";
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js").catch(() => {});
}