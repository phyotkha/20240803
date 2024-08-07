import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectDB from "./db/mongodb-connection.js";

import routes from "./routes/index.js";

dotenv.config();

const app = express();

// CORS middleware configuration
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true // Allow credentials (cookies, HTTP authentication) to be included in cross-origin requests
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/', routes);

const PORT = process.env.PORT || 8080;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    })
})