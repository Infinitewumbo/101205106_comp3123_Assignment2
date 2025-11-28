const { body, validationResult } = require('express-validator');

// Validation chain for signup
const validateSignup = [
    // 1. Username Validation
    body('username')
        .trim()
        .notEmpty().withMessage('Username is required.'),

    // 2. Email Validation: Must be a valid email format
    body('email')
        .isEmail().withMessage('Valid email is required.')
        .normalizeEmail(), // Sanitizes the email (e.g., lowercase)

    // 3. Password Validation: Must not be empty
    body('password')
        .notEmpty().withMessage('Password is required.'),
        
    // Middleware to handle validation results and return a standard 400 response
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Return 400 Bad Request with a clear error message
            return res.status(400).json({ 
                status: false, 
                message: errors.array().map(err => err.msg).join(' ') 
            });
        }
        next();
    }
];

module.exports = { validateSignup };
