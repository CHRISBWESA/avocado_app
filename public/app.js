const SERVER_URL = "https://avocado-app-1.onrender.com";

const previewImg = document.getElementById("previewImg");
const previewArea = document.getElementById("previewArea");
const previewPlaceholder = document.getElementById("previewPlaceholder");
const cameraBtn = document.getElementById("cameraBtn");
const galleryBtn = document.getElementById("galleryBtn");
const analyzeRow = document.getElementById("analyzeRow");
const analyzeBtn = document.getElementById("analyzeBtn");
const resetBtn = document.getElementById("resetBtn");
const resultCard = document.getElementById("resultCard");
const guideBtn = document.getElementById("guideBtn");
const guideOverlay = document.getElementById("guideOverlay");
const guideClose = document.getElementById("guideClose");
const toast = document.getElementById("toast");
const dot1 = document.getElementById("dot1");
const dot2 = document.getElementById("dot2");
const dot3 = document.getElementById("dot3");

let currentImageBase64 = null;
let isAnalyzing = false;

function setDots(step) {
  dot1.classList.toggle("active", step >= 1);
  dot2.classList.toggle("active", step >= 2);
  dot3.classList.toggle("active", step >= 3);
}

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

function showPreview(dataUrl) {
  previewImg.src = dataUrl;
  previewImg.style.display = "block";
  previewPlaceholder.style.display = "none";
  previewArea.classList.add("has-image");
  analyzeRow.style.display = "flex";
  setDots(2);
}

function hidePreview() {
  previewImg.style.display = "none";
  previewImg.src = "";
  previewPlaceholder.style.display = "flex";
  previewArea.classList.remove("has-image");
  analyzeRow.style.display = "none";
  setDots(1);
}

function showLoading() {
  resultCard.style.display = "block";
  resultCard.className = "result-card";
  resultCard.innerHTML = `
    <div class="loading-spinner"></div>
    <div class="loading-text">Analyzing avocado...</div>
  `;
}

function showResult(result) {
  const isRipe = result.label === "RIPE";
  resultCard.className = "result-card " + (isRipe ? "ripe" : "unripe");
  resultCard.innerHTML = `
    <div class="result-top">
      <span class="result-label">Detection Result</span>
      <span class="result-badge ${isRipe ? "badge-ripe" : "badge-unripe"}">${result.label}</span>
    </div>
    <div class="result-confidence">${(result.confidence * 100).toFixed(1)}<span>%</span></div>
    <div class="result-desc">${result.label === "RIPE" ? "This avocado is perfectly ripe and ready to enjoy! 🥑" : "This avocado is not yet ripe. Give it a few more days to mature."}</div>
  `;
  setDots(3);
}

function showError(message) {
  resultCard.style.display = "block";
  resultCard.className = "result-card unripe";
  resultCard.innerHTML = `
    <div class="result-top">
      <span class="result-label">Error</span>
    </div>
    <div class="result-desc">${message}</div>
  `;
}

async function analyzeImage(dataUrl) {
  if (isAnalyzing) return;
  const base64 = dataUrl.split(",")[1];
  if (!base64) {
    showError("Invalid image data. Please try again.");
    return;
  }
  isAnalyzing = true;
  showLoading();
  try {
    const res = await fetch(`${SERVER_URL}/predict_base64`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image_base64: base64 }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    isAnalyzing = false;
    if (data.error) {
      showError(data.error);
    } else {
      showResult(data);
    }
  } catch (err) {
    isAnalyzing = false;
    showError("Network error. Check your connection and try again.");
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
        const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
        currentImageBase64 = dataUrl;
        showPreview(dataUrl);
        analyzeImage(dataUrl);
      };
      const overlay = document.createElement("div");
      overlay.style.cssText = "position:fixed;inset:0;background:rgba(0,0,0,0.92);display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:1000;";
      const videoEl = document.createElement("video");
      videoEl.srcObject = stream;
      videoEl.style.cssText = "width:100%;max-height:55vh;border-radius:16px;object-fit:cover;";
      videoEl.autoplay = true;
      const btn = document.createElement("button");
      btn.textContent = "📸 Capture";
      btn.style.cssText = "margin-top:28px;padding:16px 48px;border-radius:30px;border:none;background:linear-gradient(135deg,#1a7a3a,#27ae60);color:#fff;font-size:16px;font-weight:700;cursor:pointer;font-family:inherit;box-shadow:0 4px 16px rgba(39,174,96,0.3);";
      btn.addEventListener("click", capture);
      const cancel = document.createElement("button");
      cancel.textContent = "Cancel";
      cancel.style.cssText = "margin-top:14px;padding:12px 32px;border-radius:30px;border:1px solid rgba(255,255,255,0.15);background:transparent;color:#94a3b8;font-size:14px;cursor:pointer;font-family:inherit;";
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
      analyzeImage(ev.target.result);
    };
    reader.readAsDataURL(file);
  });
  input.click();
});

analyzeBtn.addEventListener("click", () => {
  if (currentImageBase64) {
    analyzeImage(currentImageBase64);
  }
});

resetBtn.addEventListener("click", () => {
  currentImageBase64 = null;
  resultCard.style.display = "none";
  hidePreview();
  setDots(1);
});

guideBtn.addEventListener("click", () => {
  guideOverlay.classList.remove("hidden");
});

guideClose.addEventListener("click", () => {
  guideOverlay.classList.add("hidden");
});

guideOverlay.addEventListener("click", (e) => {
  if (e.target === guideOverlay) {
    guideOverlay.classList.add("hidden");
  }
});