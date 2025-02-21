import { Request, Response } from "express";
import model from "../ai-model";
import { iternatyPrompt } from "../prompts";

export const generateIternary = async (req: Request, res: Response) => {
    try {
        const { startDate, endDate, startingLocation, endingLocation } = req.body;

        if (!startDate || !endDate || !startingLocation || !endingLocation) {
            res.send({ message: "All fields are compulsory!" });
        }

        const prompt = iternatyPrompt(startingLocation, endingLocation, startDate, endDate)

        const result = await model.generateContent(prompt);
        const itinerary = result.response.text();

        res.json({ itinerary });
    } catch (error) {
        console.log(error)
    }
}

export const getFlights = async (req: Request, res: Response) => {

}