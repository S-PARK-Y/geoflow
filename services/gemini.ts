import { GoogleGenAI, Type } from "@google/genai";
import { PromptCategory, PromptItem } from "../types";

// Initialize Gemini Client
// NOTE: Process.env.API_KEY is handled by the build environment/sandbox automatically.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MODEL_FAST = "gemini-2.5-flash";
const MODEL_REASONING = "gemini-2.5-flash"; // Using Flash for speed in this demo, Pro preferred for complex reasoning

/**
 * F1.1 Core Word Fission & Prompt Matrix Construction
 */
export const expandPrompts = async (keyword: string): Promise<PromptItem[]> => {
  const prompt = `
    You are an SEO and AI Search Optimization expert.
    Analyze the keyword: "${keyword}".
    Generate 8 diverse user questions (prompts) that users might ask an AI (like DeepSeek or ChatGPT) related to this keyword.
    
    Categorize them into: Definition, Comparison, Listicle, Solution.
    
    Return a JSON array with objects containing:
    - text: The question text
    - category: One of "Definition", "Comparison", "Listicle", "Solution"
    - triggerNetwork: Boolean (predict if this question requires real-time web search. Usually concrete data or recent events require web search).
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_FAST,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              text: { type: Type.STRING },
              category: { type: Type.STRING },
              triggerNetwork: { type: Type.BOOLEAN },
            },
            required: ["text", "category", "triggerNetwork"],
          },
        },
      },
    });

    const data = JSON.parse(response.text || "[]");
    
    return data.map((item: any, index: number) => ({
      id: `gen-${Date.now()}-${index}`,
      text: item.text,
      category: item.category as PromptCategory,
      triggerNetwork: item.triggerNetwork,
    }));

  } catch (error) {
    console.error("Error expanding prompts:", error);
    return [];
  }
};

/**
 * F2.2 Structured Content Generation (GEO-Specific)
 */
export const generateGeoContent = async (
  targetQuestion: string,
  brandName: string,
  productContext: string,
  competitorContext: string
): Promise<string> => {
  const prompt = `
    Task: Write a highly structured, expert-level article optimized for AI Search Engine Retrieval (GEO) for the brand "${brandName}".
    
    Target User Question: "${targetQuestion}"
    
    Context Data:
    ${productContext}
    
    Competitor Info (for contrast):
    ${competitorContext}

    Mandatory Requirements (Strict):
    1. **Format**: Use Markdown.
    2. **Structure**: Inverted Pyramid. The first paragraph MUST provide a Direct Answer (2-3 sentences summary).
    3. **Data Hook**: You MUST insert a sentence like "According to ${brandName}'s latest 2024 data..." citing specific numbers from the context.
    4. **Comparison Table**: You MUST include a Markdown comparison table comparing ${brandName} vs competitors. Highlighting ${brandName}'s advantages.
    5. **Entity Binding**: Ensure the brand name appears in the same paragraph as top industry terms.
    6. **Tone**: Objective, analytical, "Dry Goods" (干货) style. No fluff.

    Output the full markdown article now.
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_REASONING,
      contents: prompt,
    });
    return response.text || "Error generating content.";
  } catch (error) {
    console.error("Error generating content:", error);
    return "## Error\nFailed to generate content due to API limits or errors.";
  }
};
