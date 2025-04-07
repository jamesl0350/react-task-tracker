import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import {errorHandler } from './middleware/errorHandler.js';
import taskRoutes from './routes/taskRoutes.js';
import dotenv from 'dotenv'

// Use .env file in config folder
dotenv.config({path: './config/.env'});

// Initialize express app
const app = express();

// Connect to MongoDB
connectDB()

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/tasks', taskRoutes);

// Error handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server is running on port ${PORT}`))
