
import { GoogleGenAI, Type } from "@google/genai";
import { RecommendationResult } from "../types";

export const getLubricantRecommendation = async (carModel: string, mileage: string, drivingConditions: string): Promise<RecommendationResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Suggest the best TotalEnergies lubricant for a ${carModel} with ${mileage} km mileage. The user describes their driving as: ${drivingConditions}. Focus on Total Quartz or Rubia ranges.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          recommendedProduct: { type: Type.STRING, description: "Name of the specific Total product" },
          reasoning: { type: Type.STRING, description: "Short explanation why this is recommended" }
        },
        required: ["recommendedProduct", "reasoning"]
      }
    }
  });

  return JSON.parse(response.text);
};
