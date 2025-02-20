import express, { Request, Response } from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from "dotenv";

config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors())

if (!process.env.GEMINI_KEY) {
    throw new Error("GEMINI_KEY is not defined in environment variables.");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

app.get("/", (req: Request, res: Response) => {
    res.send({ msg: "healthy server" });
});

app.post("/generate-itenary", async (req: Request, res: Response) => {
    try {
        const { startDate, endDate, startingLocation, endingLocation } = req.body;

        if (!startDate || !endDate || !startingLocation || !endingLocation) {
            res.send({ message: "All fields are compulsory!" });
        }

        const prompt = `
        Generate a detailed, day-wise travel itinerary for a trip starting from ${startingLocation} to ${endingLocation}. 
        The journey starts on ${startDate} and ends on ${endDate}. 
        Include travel plans, activities, and places to visit each day.
        Format the response in a structured list format.
        `;

        const result = await model.generateContent(prompt);
        const itinerary = result.response.text();

        res.json({ itinerary });
    } catch (error) {
        console.log(error)
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
