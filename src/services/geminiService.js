// Client-side service for Gemini API calls

export const sendMessageStream = async (message, onChunk) => {
  try {
    const response = await fetch("/api/gemini", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || `API request failed: ${response.status}`
      );
    }

    const data = await response.json();
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
