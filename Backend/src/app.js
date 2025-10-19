import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { predictMaintenance } from './Controllers/predictionController.js';


const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "20kb"}));
app.use(express.urlencoded({extended: true, limit: "20kb"}));
app.use(express.static("public"));
app.use(cookieParser());



// routes import

import router from './Routes/predication.Routes.js';

app.use('/api', router)

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});








export default app;









app.use((req, res, next) => {
    console.log("Incoming request:", req.method, req.url);
    next();
});







export { app }
