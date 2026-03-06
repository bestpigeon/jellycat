import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function search() {
  const response = await ai.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: "Find direct image URLs (ending in .jpg or .png) for these exact Jellycat toys from official or retail websites: 1. Bashful Bunny 2. Ricky Rain Frog 3. Amuseable Croissant 4. Odell Octopus 5. Bartholomew Bear 6. Amuseable Cloud. Provide ONLY the 6 direct image URLs in a JSON array.",
    config: {
      tools: [{ googleSearch: {} }],
    },
  });
  console.log(response.text);
}

search().catch(console.error);
