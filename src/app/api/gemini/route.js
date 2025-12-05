import { GoogleGenerativeAI } from "@google/generative-ai";
import { getSystemInstruction } from "../../../../constants.js";

let chatSession = null;
let genAI = null;

const getGenAI = () => {
  if (!genAI) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is missing");
    }
    genAI = new GoogleGenerativeAI(apiKey);
  }
  return genAI;
};

export async function POST(request) {
  try {
    const { message, inventory } = await request.json();

    if (!chatSession) {
      const ai = getGenAI();
      const model = ai.getGenerativeModel({ model: "gemini-pro" });
      chatSession = model.startChat({
        systemInstruction: getSystemInstruction(inventory || []),
        generationConfig: {
          temperature: 0.7,
        },
      });
    }

    const result = await chatSession.sendMessageStream(message);
    let fullText = "";

    for await (const chunk of result.stream) {
      fullText += chunk.text() || "";
    }

    return Response.json({ response: fullText });
  } catch (error) {
    console.error("Gemini API error:", error.message);
    console.error("Stack:", error.stack);
    return Response.json(
      { error: error.message || "Failed to process request" },
      { status: 500 }
    );
  }
}
