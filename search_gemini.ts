import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function search() {
  const response = await ai.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: "What are the exact subcategories listed under 'Animals' on the official Jellycat website (us.jellycat.com/animals)? Please list them.",
    config: {
      tools: [{ googleSearch: {} }],
    },
  });
  console.log(response.text);
}

search().catch(console.error);
