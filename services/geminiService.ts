import { GoogleGenerativeAI } from "@google/generative-ai";
import { ProjectData } from "../types";

// Sử dụng import.meta.env cho Vite
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(API_KEY);

export const analyzeProjectData = async (project: ProjectData): Promise<string> => {
  try {
    // Kiểm tra nếu chưa có API Key
    if (!API_KEY) return "API Key is missing. Please check your .env file.";

    // Lấy model (Lưu ý: hiện tại là gemini-1.5-flash, chưa có 2.5)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    
    const chartSummary = JSON.stringify(project.chartDataMain.slice(0, 5));
    
    const prompt = `
      You are a Business Intelligence Analyst. Analyze the following project data for "${project.title}".
      
      
      Trend Data Sample: ${chartSummary}
      Description: ${project.description}

      Provide a concise, 3-bullet point executive summary of insights. 
      Focus on what is going well and one potential area for improvement. 
      Keep the tone professional yet encouraging.
      Return plain text with bullet points.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text || "Could not generate insights at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Unable to connect to AI service. Please check your API Key configuration.";
  }
};