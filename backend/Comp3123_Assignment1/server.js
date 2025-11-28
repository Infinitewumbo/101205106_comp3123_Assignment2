require('dotenv').config(); // Load environment variables from .env
const express = require('express');
const { connectDB } = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming JSON data
app.use(express.json());
app.use(cors()); // Enable CORS for all routes
app.use('/uploads', express.static('uploads'));

// Route handlers
app.use('/api/v1/emp', employeeRoutes);
app.use('/api/v1/user', userRoutes); 

app.get('/', (req, res) => {
    res.send('COMP 3123 Assignment 1 Backend Running!');
});

// Start the server and connect to DB
const startServer = async () => {
    try {
        await connectDB(); 

        // Start listening for HTTP requests
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
            console.log(`Database Name: ${process.env.MONGO_URI.includes('comp3123_assigment1') ? 'comp3123_assigment1 (OK)' : 'CHECK DB NAME!'}`);
        });

    } catch (error) {
        console.error("Fatal error starting server:", error);
        process.exit(1);
    }
};

startServer();