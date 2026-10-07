//  "about_TUTORIAL_Start": "// This tutorial start leaning from youtube channel here is URL: https://www.youtube.com/watch?v=cDTTiFiXRz8&list=PLsjpRo2EZP1KsKtZy_JeDsolrcX0E7hlX",
import express from "express";
import cors from "cors";
import todoRoutes from "./routes/todo.routes.js";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { errorHandler } from "./middleware/error.middleware.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

//Middleware
app.use(cors());
app.use(express.json());

//Routes
app.use("/api", todoRoutes);

// Connect to MongoDB
connectDB();

// Error Handling Middleware
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});