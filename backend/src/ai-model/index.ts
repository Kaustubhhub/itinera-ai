import { config } from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
config();

if (!process.env.GEMINI_KEY) {
    throw new Error("GEMINI_KEY is not defined in environment variables.");
}
const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export default model;