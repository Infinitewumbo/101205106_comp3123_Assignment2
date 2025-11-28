const { body, validationResult, param, query } = require('express-validator');

// Validation for creating/updating an employee
const validateEmployee = [
    body('first_name').notEmpty().withMessage('First name is required.'),
    body('last_name').notEmpty().withMessage('Last name is required.'),
    body('email').isEmail().withMessage('Valid email is required.').normalizeEmail(),
    body('position').notEmpty().withMessage('Position is required.'),
    // Salary must be a number and greater than 0
    body('salary').isNumeric().withMessage('Salary must be a number.').toFloat().isFloat({ gt: 0 }).withMessage('Salary must be positive.'),
    // Date must be a valid ISO 8601 date format
    body('date_of_joining').isISO8601().toDate().withMessage('Date of joining must be a valid date (ISO 8601 format).'),
    body('department').notEmpty().withMessage('Department is required.'),

    // Middleware to catch errors
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                status: false, 
                message: errors.array().map(err => err.msg).join(' ') 
            });
        }
        next();
    }
];

// Validation for MongoDB ObjectId in URL params (e.g., GET/PUT/DELETE by ID)
const validateMongoId = (idType) => { // idType will be 'eid' (param) or 'eid' (query)
    // Checks if the string is a valid 24-character hexadecimal MongoDB ID
    const checker = idType === 'param' ? param('eid') : query('eid');
    
    return [
        checker.isMongoId().withMessage(`Invalid Employee ID format provided in ${idType}.`),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ status: false, message: errors.array().map(err => err.msg).join(' ') });
            }
            next();
        }
    ];
};


module.exports = { validateEmployee, validateMongoId };