export const iternatyPrompt = (startingLocation: string, endingLocation: string, startDate: string, endDate: string) => {
    const prompt = `
        Generate a detailed, day-wise travel itinerary for a trip starting from ${startingLocation} to ${endingLocation}. 
        The journey starts on ${startDate} and ends on ${endDate}. 
        Include travel plans, activities, and places to visit each day.
        Format the response in a structured list format.
        `;

    return prompt;
}