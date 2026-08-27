import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error(
    "GEMINI_API_KEY is missing. Check server/.env"
  );
}

const ai = new GoogleGenAI({
  apiKey,
});

const model =
  process.env.GEMINI_MODEL || "gemini-3-flash-preview";

export async function analyzeReport(report) {
  const prompt = `
أنت محلل أداء وتسويق رقمي داخل نظام MarketPilot.

حلل بيانات التقرير التالية اعتمادًا فقط على البيانات الموجودة.
لا تخترع أرقامًا أو معلومات غير موجودة.

أعد النتيجة باللغة العربية وبصيغة JSON فقط بهذا الشكل:

{
  "summary": "ملخص واضح ومختصر للأداء",
  "strengths": [
    "نقطة قوة 1",
    "نقطة قوة 2",
    "نقطة قوة 3"
  ],
  "risks": [
    "ملاحظة أو خطر 1",
    "ملاحظة أو خطر 2"
  ],
  "recommendations": [
    "توصية عملية 1",
    "توصية عملية 2",
    "توصية عملية 3"
  ]
}

بيانات التقرير:

${JSON.stringify(report, null, 2)}
`;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
  });

  
const text =
  response.text?.trim() || "";

if (!text) {
  throw new Error("Gemini returned an empty response");
}

const cleanedText = text
  .replace(/^```json\s*/i, "")
  .replace(/^```\s*/i, "")
  .replace(/\s*```$/i, "")
  .trim();

try {
  return JSON.parse(cleanedText);
} catch {
  return {
    summary: cleanedText,
    strengths: [],
    risks: [],
    recommendations: [],
  };
}

}