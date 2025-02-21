"use client"

import axios from "axios";
import { useState } from "react";

const Form = () => {
    const [formData, setFormData] = useState({
        startDate: "",
        endDate: "",
        startingLocation: "",
        endingLocation: "",
    });

    const [itinerary, setItinerary] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setItinerary(null);
        setError(null);

        try {
            console.log(formData)
            const response = await axios.post("http://localhost:8080/api/v1/generate-itenary", formData);
            setItinerary(response.data.itinerary);
        } catch (err) {
            setError("Failed to generate itinerary. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                    AI Travel Itinerary Generator
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Start Date</label>
                        <input
                            type="date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">End Date</label>
                        <input
                            type="date"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Starting Location</label>
                        <input
                            type="text"
                            name="startingLocation"
                            value={formData.startingLocation}
                            onChange={handleChange}
                            placeholder="Enter starting location"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">endingLocation</label>
                        <input
                            type="text"
                            name="endingLocation"
                            value={formData.endingLocation}
                            onChange={handleChange}
                            placeholder="Enter your endingLocation"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
                        disabled={loading}
                    >
                        {loading ? "Generating Itinerary..." : "Generate Itinerary"}
                    </button>
                </form>

                {error && <p className="text-red-600 mt-4 text-center">{error}</p>}

                {itinerary && (
                    <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-md">
                        <h2 className="text-lg font-semibold text-gray-700">Your Itinerary:</h2>
                        <pre className="text-gray-600 whitespace-pre-wrap mt-2">{itinerary}</pre>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Form;