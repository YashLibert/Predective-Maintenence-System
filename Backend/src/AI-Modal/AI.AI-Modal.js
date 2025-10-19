import fetch from 'node-fetch';
import { HUGGINGFACE_API_URL } from '../constant.js';
import dotenv from 'dotenv';

dotenv.config();

export const getPrediction = async (inputData) => {
    // Use the HF_API_KEY as defined in your provided code
    const API_TOKEN = process.env.HF_API_KEY;
    if (!API_TOKEN) {
        throw new Error("HF_API_KEY is not set in environment variables.");
    }

    try {
        const response = await fetch(HUGGINGFACE_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ inputs: inputData })
        });

        // --- 🎯 FIX: Check HTTP status code before parsing JSON 🎯 ---
        if (!response.ok) {
            // Read the text body of the error response (e.g., "Not Found", "Unauthorized")
            const errorBody = await response.text();
            
            // Throw a specific error including the status and body
            throw new Error(`Hugging Face API request failed with status ${response.status}: ${errorBody}`);
        }
        // -----------------------------------------------------------

        const data = await response.json();
        
        // Ensure the response structure is as expected before accessing indices
        if (!data || data.length === 0 || !data[0] || data[0].length === 0) {
             throw new Error("Hugging Face API returned empty or unexpected structure.");
        }
        
        const predictionLabel = data[0][0].label;
        return predictionLabel === 'POSITIVE' ? 'Low Risk' : 'High Risk';
        
    } catch (error) {
        // Re-throw the structured error for your asyncHandler to catch
        throw new Error('Hugging Face API error: ' + error.message);
    }
};
