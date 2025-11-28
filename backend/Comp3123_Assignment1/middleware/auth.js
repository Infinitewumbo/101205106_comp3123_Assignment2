const jwt = require('jsonwebtoken');
const { connectDB } = require('../config/db');
const { ObjectId } = require('mongodb');

// This middleware checks for a valid JWT in the Authorization header
const protect = async (req, res, next) => {
    let token;

    // Check for "Authorization: Bearer <token>" in the headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header (split "Bearer <token>")
            token = req.headers.authorization.split(' ')[1];

            // Verify token using the secret key
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // Fetch user to ensure they exist
            const db = await connectDB();
            const user = await db.collection('users').findOne({ _id: new ObjectId(decoded.id) });

            if (!user) {
                return res.status(401).json({ status: false, message: 'Not authorized, user not found' });
            }

            // Attach user ID to the request
            req.user_id = decoded.id; 

            next(); // Token is valid, proceed to the controller
            
        } catch (error) {
            console.error('JWT Error:', error.message);
            return res.status(401).json({ status: false, message: 'Not authorized, token failed or expired.' });
        }
    }

    if (!token) {
        return res.status(401).json({ status: false, message: 'Not authorized, no token provided.' });
    }
};

module.exports = { protect };