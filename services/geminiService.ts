import { GoogleGenAI, Type } from "@google/genai";
import { CareerAnalysis } from "../types";

const SYSTEM_INSTRUCTION = `
You are a senior career strategist and hiring manager with 15+ years of experience.
You specialize in mapping resumes to real-world job roles, identifying skill gaps,
and creating structured, actionable career roadmaps.

You must reason carefully and avoid hallucinations.
Base recommendations only on the provided resume and interests.

TASK:
Analyze the resume and interests below. Recommend suitable job roles,
calculate job-fit percentages, identify missing skills, and generate a
personalized learning and portfolio roadmap.

CONTEXT:
The user is a student or early professional seeking clarity on realistic
job roles and a structured upskilling plan.
`;

export const analyzeCareerPath = async (resumeText: string, interestsText: string): Promise<CareerAnalysis> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      recommended_roles: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            role: { type: Type.STRING },
            fit_percentage: { type: Type.STRING, description: "A percentage string like '85%'" },
            justification: { type: Type.STRING },
          },
          required: ["role", "fit_percentage", "justification"],
        },
      },
      current_skills: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
      },
      missing_skills: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
      },
      learning_roadmap: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            week: { type: Type.STRING },
            focus: { type: Type.STRING },
            resources: { type: Type.STRING },
          },
          required: ["week", "focus", "resources"],
        },
      },
      portfolio_projects: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
      },
      resume_improvements: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
      },
    },
    required: [
      "recommended_roles",
      "current_skills",
      "missing_skills",
      "learning_roadmap",
      "portfolio_projects",
      "resume_improvements",
    ],
  };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          role: "user",
          parts: [
            { text: `RESUME:\n${resumeText}\n\nINTERESTS:\n${interestsText}` }
          ]
        }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        thinkingConfig: { thinkingBudget: 0 } // Disable thinking for faster JSON structure generation
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response received from Gemini.");
    }

    return JSON.parse(text) as CareerAnalysis;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};