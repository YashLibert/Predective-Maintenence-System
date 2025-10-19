import express from 'express';
import { predictMaintenance, getHistory } from '../Controllers/predictionController.js';

const router = express.Router();

router.post('/predict', predictMaintenance);
router.get('/history', getHistory);

export default router;