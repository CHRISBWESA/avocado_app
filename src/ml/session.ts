const SERVER_URL = "https://avocado-api.onrender.com/predict_base64";

export async function runPrediction(
  imageBase64: string,
  mimeType: string,
): Promise<any> {
  const response = await fetch(SERVER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      image: imageBase64,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "Server error");
  }

  return response.json();
}