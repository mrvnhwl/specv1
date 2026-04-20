import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error("Missing GEMINI_API_KEY");
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    const { message, device, preferences } = await req.json();

    // ✅ STRICT RULE-BASED FILTER
    const allowedKeywords = [
      "gpu", "cpu", "ram", "ssd", "storage",
      "upgrade", "fps", "game", "compatibility",
      "pc", "laptop", "spec", "build", "performance"
    ];

    const isValid = allowedKeywords.some(keyword =>
      message.toLowerCase().includes(keyword)
    );

    if (!isValid) {
      return Response.json({
        reply:
          "I can only answer questions about PC specs, upgrades, compatibility, and gaming performance."
      });
    }

    const model = genAI.getGenerativeModel({
      model: "models/gemini-2.5-flash",
    });

    // ✅ ADVANCED CONTROLLED PROMPT
    const prompt = `
You are a STRICT PC hardware assistant.

You MUST follow ALL rules below:

=====================
SCOPE RULES
=====================
- ONLY answer about:
  • PC specs
  • hardware upgrades
  • compatibility
  • gaming performance
- If unsure, stay within scope
- DO NOT answer unrelated topics


=====================
STYLE RULES
=====================
- Use bullet points with "-"
- No long paragraphs
- Be concise and clear
- Sound like a PC expert
- Do NOT repeat the question

=====================
USER DATA
=====================
Device:
${JSON.stringify(device, null, 2)}

Preferences:
${JSON.stringify(preferences, null, 2)}

Question:
${message}
`;

    // ✅ RETRY LOGIC (SMART)
    let attempts = 3;
    let responseText = "";

    while (attempts > 0) {
      try {
        const result = await model.generateContent(prompt);
        responseText = result.response.text();
        break;
      } catch (err: any) {
        console.log("Retrying...", attempts);

        if (attempts === 1) throw err;

        await new Promise((res) => setTimeout(res, 1500));
        attempts--;
      }
    }

    // ✅ FALLBACK (if AI returns empty)
    if (!responseText || responseText.trim() === "") {
      responseText =
        "⚠️ Unable to generate a response. Please try again.";
    }

    return Response.json({ reply: responseText });

  } catch (error: any) {
    console.error("ERROR:", error.message);

    return Response.json(
      {
        reply:
          "⚠️ AI is currently busy or unavailable. Please try again.",
      },
      { status: 500 }
    );
  }
}