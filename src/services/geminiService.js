// Client-side service for Gemini API calls
import { INTERNAL_API_BASE_URL } from "@/app/config";

const parseJsonOrText = async (response) => {
  const raw = await response.text();
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return raw;
  }
};

export const sendMessageStream = async (message, inventory, onChunk) => {
  try {
    const response = await fetch(`${INTERNAL_API_BASE_URL}/api/gemini`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, inventory }),
    });

    const payload = await parseJsonOrText(response);

    if (!response.ok) {
      const errorMessage =
        payload && typeof payload === "object" && "error" in payload
          ? payload.error
          : typeof payload === "string"
            ? payload
            : null;

      throw new Error(errorMessage || `API request failed: ${response.status}`);
    }

    if (!payload || typeof payload !== "object") {
      throw new Error("API response was not valid JSON");
    }

    const data = payload;
    if (onChunk) {
      onChunk(data.response);
    }
    return data.response;
  } catch (error) {
    console.error("Error sending message:", error.message);
    throw error;
  }
};

export const initializeChat = (inventory) => {
  // This is handled server-side now
  console.log("Chat initialized with inventory:", inventory);
};

export const extractRecommendedProducts = (text, inventory) => {
  const recommended = [];
  const lowerText = text.toLowerCase();

  inventory.forEach((product) => {
    if (product?.name && lowerText.includes(product.name.toLowerCase())) {
      recommended.push(product);
    }
  });

  return recommended;
};
