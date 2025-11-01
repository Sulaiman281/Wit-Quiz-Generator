import { GoogleGenAI, Type } from "@google/genai";
import { Question } from '../types';

// FIX: Removed unnecessary 'as string' type assertion.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      Text: { type: Type.STRING, description: 'The quiz question text.' },
      Options: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: 'A list of three realistic but incorrect answers (distractors).',
      },
      CorrectAnswer: { type: Type.STRING, description: 'The single correct answer.' },
      Category: { type: Type.STRING, description: 'The category or subject derived from the user topic.' },
      Difficulty: { type: Type.STRING, description: 'The difficulty level, must be "medium".' },
    },
    required: ['Text', 'Options', 'CorrectAnswer', 'Category', 'Difficulty'],
  },
};

const getPrompt = (topic: string, count: number): string => {
  // Clamp the count between 5 and 20 as per instructions
  const questionCount = Math.max(5, Math.min(20, count));

  return `
    You are an intelligent educational quiz generator.
    Your task is to create exactly ${questionCount} quiz questions in JSON format based on the user's provided topic.

    **Topic:** "${topic}"

    **Rules:**
    1.  Generate exactly ${questionCount} unique, factual, and educational questions.
    2.  Keep questions concise and contextually accurate to the topic.
    3.  "Options" array must contain exactly 3 related but incorrect answers (distractors).
    4.  "CorrectAnswer" field must hold the single correct answer.
    5.  "Category" should be a lowercase string reflecting the main subject of the topic (e.g., "science", "islamic history").
    6.  "Difficulty" must be "medium".
    7.  Maintain respect and cultural sensitivity.
    8.  Ensure no duplicate questions or answers within the generated set.

    Return a pure JSON array of question objects that strictly adheres to the provided schema. Do not include any markdown, explanations, or text outside the JSON array.
  `;
};

export const generateQuizQuestions = async (
  topic: string,
  count: number
): Promise<Question[]> => {
  if (!topic.trim()) {
    throw new Error("Topic cannot be empty.");
  }

  const prompt = getPrompt(topic, count);

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: responseSchema,
        temperature: 0.7,
      }
    });

    const jsonText = response.text.trim();
    const newQuestions: Question[] = JSON.parse(jsonText);
    
    if (!Array.isArray(newQuestions)) {
        throw new Error("API did not return a valid JSON array.");
    }

    return newQuestions;
  } catch (error) {
    console.error("Error generating quiz questions:", error);
    if (error instanceof Error && error.message.toLowerCase().includes('json')) {
        throw new Error("The AI failed to generate a valid JSON response. Please try adjusting your topic or try again.");
    }
    throw new Error("Failed to generate quiz questions. An unexpected error occurred.");
  }
};