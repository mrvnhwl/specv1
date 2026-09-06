import { GoogleGenerativeAI } from "@google/generative-ai";
import { answerUpgradeQuestion } from '@/lib/mock-chat';

export async function POST(req: Request) {
  let requestMessage = '';
  let requestDevice = {};

  try {
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY;
    const { message, device = {}, preferences = {} } = await req.json();
    requestMessage = typeof message === 'string' ? message : '';
    requestDevice = device;

    if (!apiKey) {
      return Response.json({ reply: answerUpgradeQuestion(message || '', device) });
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    if (typeof message !== 'string' || !message.trim()) {
      return Response.json({ reply: 'Ask me about upgrades, compatibility, or gaming performance.' }, { status: 400 });
    }

    // ✅ STRICT RULE-BASED FILTER
    const allowedKeywords = [
      "gpu", "cpu", "ram", "ssd", "storage",
      "upgrade", "fps", "game", "compatibility",
      "pc", "laptop", "spec", "build", "performance", "status"
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
      model: "gemini-2.5-flash",
    });

    // 🔥 IMPROVED PROMPT (MAIN UPGRADE)
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
- Use ONLY "-" for bullet points
- DO NOT use markdown symbols like ** or *
- DO NOT use emojis
- DO NOT use long paragraphs
- Keep answers concise and structured
- Sound like a PC expert

=====================
FORMAT RULES (VERY IMPORTANT)
=====================
- ALWAYS divide answers into sections
- Use EXACT section titles when applicable:

System Overview:
Esports Titles:
AAA Games:
Performance Notes:
Storage Recommendation:
General Upgrade Advice and Recommendation:

- Each section MUST be separated by a blank line
- Each section MUST contain bullet points
- Keep everything easy to scan (user-friendly)

=====================
USER DATA
=====================
Device:
${JSON.stringify(device, null, 2)}

Preferences:
${JSON.stringify(preferences, null, 2)}

=====================
QUESTION
=====================
${message}

=====================
OUTPUT EXAMPLE FORMAT
=====================

Short intro sentence.

System Overview:
- GPU: ...
- RAM: ...
- CPU: ...

Esports Titles:
Short intro sentence.
- Game 1
- Game 2

AAA Games:
Short intro sentence.
- Game - Settings

CPU Recommendation:
- Advice here

GPU Recommendation:
- Advice here

RAM Recommendation:
- Advice here

Storage Recommendation:
- Advice here
`;

    // ✅ RETRY LOGIC
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

    // ✅ CLEAN OUTPUT (FINAL SAFETY)
    if (responseText) {
      // remove unwanted markdown if AI still outputs it
      responseText = responseText
        .replace(/\*\*/g, '')   // remove **
        .replace(/\*/g, '')     // remove *
        .trim();
    }

    // ✅ FALLBACK
    if (!responseText) {
      responseText =
        "⚠️ Unable to generate a response. Please try again.";
    }

    return Response.json({ reply: responseText });

  } catch (error: any) {
    console.error("ERROR:", error.message);

    return Response.json(
      {
        reply: answerUpgradeQuestion(requestMessage, requestDevice)
      }
    );
  }
}