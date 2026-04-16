import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GEMINI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { message, device, preferences } = await req.json();

    const prompt = `
You are a PC gaming assistant.

Device:
CPU: ${device?.cpuName || "Unknown"}
GPU: ${device?.gpuName || "Unknown"}
RAM: ${device?.ramGb || "Unknown"} GB

Preferences:
${preferences?.genres?.join(", ") || "None"}

User Question:
${message}

Be honest and realistic.
If the PC cannot run a game, say it clearly.
Suggest upgrades if needed.
`;

    const result = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: prompt,
    });

    // 🔥 IMPORTANT FIX
    const reply =
      result?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from AI.";

    return NextResponse.json({ reply });

  } catch (error) {
    console.error("Gemini Error:", error);

    return NextResponse.json(
      {
        reply:
          "⚠️ AI error. Check console (likely model or API key issue).",
      },
      { status: 500 }
    );
  }
}