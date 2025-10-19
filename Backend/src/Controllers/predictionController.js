import { Predication } from "../Modals/Predication.js";
import { getPrediction } from "../AI-Modal/AI.AI-Modal.js";
import { asyncHandler } from "../Utils/asynicHandler.js";
import { ApiError } from "../Utils/apiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import mongoose from "mongoose";

export const predictMaintenance = asyncHandler(async (req, res) => {
    const { inputData } = req.body;

    if (!inputData) {
        throw new ApiError(400, 'Input data is required');
    }

    try {
        const prediction = await getPrediction(inputData);
        const newPrediction = new Predication({ inputData, prediction });
        console.log('Saving to database:', mongoose.connection.db.databaseName);
        console.log('Saving prediction:', { inputData, prediction });
        await newPrediction.save();
        return res.status(200).json(
            new ApiResponse(200, { prediction }, 'Prediction saved successfully')
        );
    } catch (error) {
        console.error('Prediction error:', error);
        throw new ApiError(500, 'Something went wrong');
    }
});

export const getHistory = asyncHandler(async (req, res) => {
    try {
        const history = await Predication.find().sort({ timestamp: -1 }).limit(10);
        console.log('Fetched history, count:', history.length);
        return res.status(200).json(
            new ApiResponse(200, history, 'History fetched successfully')
        );
    } catch (error) {
        console.error('History error:', error);
        throw new ApiError(500, 'Error while fetching history');
    }
});