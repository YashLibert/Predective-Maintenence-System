import mongoose from "mongoose";

const predicationSchema = new mongoose.Schema({
    inputData: String,
    predication: String,
    timestamp: {type: Date, default: Date.now}
});

export const Predication = mongoose.model('Prediction', predicationSchema);