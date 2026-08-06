const SERVER_URL = "https://avocado-app-1.onrender.com";

const preview = document.getElementById("preview");
const previewContainer = document.getElementById("previewContainer");
const placeholder = document.getElementById("placeholder");
const cameraBtn = document.getElementById("cameraBtn");
const galleryBtn = document.getElementById("galleryBtn");
const statusBox = document.getElementById("statusBox");
const statusText = document.getElementById("statusText");
const resultBox = document.getElementById("resultBox");

let currentImageBase64 = null;

function showPreview(dataUrl) {
  preview.src = dataUrl;
  preview.style.display = "block";
  placeholder.style.display = "none";
  previewContainer.classList.add("has-image");
}

function hidePreview() {
  preview.style.display = "none";
  preview.src = "";
  placeholder.style.display = "flex";
  previewContainer.classList.remove("has-image");
}

function showStatus(text) {
  statusBox.style.display = "flex";
  statusText.textContent = text;
}

function hideStatus() {
  statusBox.style.display = "none";
}

function showResult(result) {
  resultBox.style.display = "block";
  const isRipe = result.label === "RIPE";
  resultBox.className = "result-box " + (isRipe ? "ripe" : "unripe");
  resultBox.innerHTML = `
    <div class="result-header">
      <span class="badge2 ${isRipe ? "badge-ripe" : "badge-unripe"}">${result.label}</span>
      <span class="confidence">${(result.confidence * 100).toFixed(1)}%</span>
    </div>
    <p class="description">${result.label === "RIPE" ? "This avocado is perfectly ripe and ready to enjoy! 🥑" : "This avocado is not yet ripe. Give it a few more days."}</p>
  `;
}

function showError(message) {
  resultBox.style.display = "block";
  resultBox.className = "result-box unripe";
  resultBox.innerHTML = `<div class="error-alert">${message}</div>`;
}

async function sendImage(dataUrl) {
  const base64 = dataUrl.split(",")[1];
  showStatus("Sending image for analysis...");
  try {
    const res = await fetch(`${SERVER_URL}/predict_base64`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image_base64: base64 }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    hideStatus();
    showResult(data);
  } catch (err) {
    hideStatus();
    showError("Failed to analyze. Check your connection and try again.");
  }
}

cameraBtn.addEventListener("click", () => {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    showError("Camera not supported on this device.");
    return;
  }
  navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
    .then((stream) => {
      const video = document.createElement("video");
      video.srcObject = stream;
      video.play();
      const capture = () => {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext("2d").drawImage(video, 0, 0);
        stream.getTracks().forEach((t) => t.stop());
        const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
        currentImageBase64 = dataUrl;
        showPreview(dataUrl);
        sendImage(dataUrl);
      };
      const overlay = document.createElement("div");
      overlay.style.cssText = "position:fixed;inset:0;background:rgba(0,0,0,0.9);display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:1000;";
      const videoEl = document.createElement("video");
      videoEl.srcObject = stream;
      videoEl.style.cssText = "width:100%;max-height:60vh;border-radius:12px;";
      videoEl.autoplay = true;
      const btn = document.createElement("button");
      btn.textContent = "📸 Capture";
      btn.style.cssText = "margin-top:24px;padding:16px 40px;border-radius:30px;border:none;background:#27ae60;color:#fff;font-size:16px;font-weight:700;cursor:pointer;font-family:inherit;";
      btn.addEventListener("click", capture);
      const cancel = document.createElement("button");
      cancel.textContent = "Cancel";
      cancel.style.cssText = "margin-top:12px;padding:12px 30px;border-radius:30px;border:1px solid rgba(255,255,255,0.2);background:transparent;color:#94a3b8;font-size:14px;cursor:pointer;font-family:inherit;";
      cancel.addEventListener("click", () => {
        stream.getTracks().forEach((t) => t.stop());
        overlay.remove();
      });
      overlay.appendChild(videoEl);
      overlay.appendChild(btn);
      overlay.appendChild(cancel);
      document.body.appendChild(overlay);
    })
    .catch(() => showError("Camera access denied."));
});

galleryBtn.addEventListener("click", () => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      currentImageBase64 = ev.target.result;
      showPreview(ev.target.result);
      sendImage(ev.target.result);
    };
    reader.readAsDataURL(file);
  });
  input.click();
});