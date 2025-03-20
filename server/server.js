const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const {errorHandler } = require('./middleware/errorHandler');
const taskRoutes = require('./routes/taskRoutes');

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
