import { GoogleGenerativeAI } from "@google/generative-ai";
import { getSystemInstruction } from "../../../../constants.js";

let genAI = null;

export const runtime = "nodejs";

const getGenAI = () => {
  if (!genAI) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error(
        "GEMINI_API_KEY is missing. Set it in .env.local and restart the dev server.",
      );
    }
    genAI = new GoogleGenerativeAI(apiKey);
  }
  return genAI;
};

export async function POST(request) {
  try {
    const { message, inventory } = await request.json();
    if (!message || typeof message !== "string") {
      return Response.json(
        { error: "'message' is required and must be a string." },
        { status: 400 },
      );
    }

    const ai = getGenAI();
    const model = ai.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: {
        parts: [{ text: getSystemInstruction(inventory || []) }],
        role: "system",
      },
    });

    // Keep chat state request-scoped to avoid cross-user leakage in long-lived servers.
    const chatSession = model.startChat({
      generationConfig: {
        temperature: 0.7,
      },
    });

    const result = await chatSession.sendMessageStream(message);
    let fullText = "";

    for await (const chunk of result.stream) {
      fullText += chunk.text() || "";
    }

    return Response.json({ response: fullText });
  } catch (error) {
    console.error("Gemini API error:", error.message);
    console.error("Stack:", error.stack);

    const status = Number(error?.status) || Number(error?.statusCode) || 500;
    const isMissingKeyError =
      typeof error?.message === "string" &&
      error.message.includes("GEMINI_API_KEY is missing");

    return Response.json(
      {
        error: error.message || "Failed to process request",
        hint: isMissingKeyError
          ? "Set GEMINI_API_KEY in your production environment variables and redeploy."
          : undefined,
        code: isMissingKeyError
          ? "MISSING_GEMINI_API_KEY"
          : "GEMINI_REQUEST_FAILED",
      },
      {
        status: isMissingKeyError
          ? 503
          : status >= 400 && status < 600
            ? status
            : 500,
      },
    );
  }
}
