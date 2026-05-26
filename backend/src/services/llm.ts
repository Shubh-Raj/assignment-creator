import { GoogleGenAI } from '@google/genai';
import { AssignmentOutput } from '../models/Assignment';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

const MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

export async function generateQuestions(prompt: string): Promise<AssignmentOutput> {
  const response = await ai.models.generateContent({
    model: MODEL,
    contents: prompt,
    config: {
      temperature: 0.7,
      maxOutputTokens: 8192,
      responseMimeType: 'application/json',
    },
  });

  const text = response.text ?? '';

  const cleaned = text
    .replace(/```json\s*/gi, '')
    .replace(/```\s*/gi, '')
    .trim();

  const parsed: AssignmentOutput = JSON.parse(cleaned);

  if (!parsed.sections || !Array.isArray(parsed.sections)) {
    throw new Error('Invalid LLM response: missing sections array');
  }

  return parsed;
}
