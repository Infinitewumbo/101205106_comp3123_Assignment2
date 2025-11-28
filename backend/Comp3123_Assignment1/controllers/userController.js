const { connectDB } = require('../config/db');
const { hashPassword, verifyPassword } = require('../utils/password'); // bcryptjs helpers
const { ObjectId } = require('mongodb'); // Required for native driver
const jwt = require('jsonwebtoken');

// Helper to generate a token
const generateToken = (id) => {
    // Uses the JWT_SECRET from the .env file
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' }); 
};

// 1. POST /api/v1/user/signup
exports.signup = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const db = await connectDB();
        const usersCollection = db.collection('users'); // Reference to the 'users' collection

        // A. Check for existing user
        const existingUser = await usersCollection.findOne({
            $or: [{ username: username }, { email: email }]
        });

        if (existingUser) {
            return res.status(400).json({
                status: false,
                message: 'User with this username or email already exists.'
            });
        }

        // B. Hash the password using bcryptjs
        const hashedPassword = await hashPassword(password);

        // C. Prepare and insert new user document
        const newUser = {
            username: username,
            email: email,
            password: hashedPassword, // Store the HASH
            created_at: new Date(),
            updated_at: new Date()
        };

        const result = await usersCollection.insertOne(newUser);

        // D. Return the required 201 Created response
        res.status(201).json({
            message: 'User created successfully.',
            user_id: result.insertedId.toString()
        });

    } catch (error) {
        console.error('Signup Error:', error);
        res.status(500).json({ status: false, message: 'Server error during signup.' });
    }
};

// 2. POST /api/v1/user/login
exports.login = async (req, res) => {
    const { email, username, password } = req.body; 

    try {
        const db = await connectDB();
        const usersCollection = db.collection('users');
        
        // A. Find the user by username OR email
        const user = await usersCollection.findOne({
            $or: [{ email: email }, { username: username }]
        });

        if (!user) {
            return res.status(401).json({ status: false, message: 'Invalid Username/Email and password' });
        }

        // B. Verify the password hash using bcryptjs
        const isMatch = await verifyPassword(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ status: false, message: 'Invalid Username/Email and password' });
        }

        // C. Generate JWT token
        const token = generateToken(user._id.toString());

        // D. Return the required 200 OK response
        res.status(200).json({
            message: 'Login successful.',
            jwt_token: token
        });

    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ status: false, message: 'Server error during login.' });
    }
};