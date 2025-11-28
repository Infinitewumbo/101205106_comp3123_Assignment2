const express = require('express');
const router = express.Router();
const multer = require('multer'); 
const path = require('path');
const employeeController = require('../controllers/employeeController');
const { protect } = require('../middleware/auth'); 
const { validateEmployee, validateMongoId } = require('../middleware/employeeValidation'); 

// --- 1. SETUP IMAGE STORAGE ---
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Save files in the 'uploads' folder
    },
    filename: (req, file, cb) => {
        // Rename file to avoid duplicates (e.g., '123456789-profile.jpg')
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});

const upload = multer({ storage: storage });

// --- 2. DEFINE ROUTES ---

// GET All Employees
router.get('/employees', employeeController.listEmployees);

// POST Create Employee (Now accepts a file named 'profile_pic')
router.post('/employees', upload.single('profile_pic'), employeeController.createEmployee);

// GET One Employee
router.get('/employees/:eid', validateMongoId('param'), employeeController.getEmployeeById);

// PUT Update Employee (Now accepts a file)
router.put('/employees/:eid', validateMongoId('param'), upload.single('profile_pic'), employeeController.updateEmployee);

// DELETE Employee
router.delete('/employees', validateMongoId('query'), employeeController.deleteEmployee);

// SEARCH Employee (New Requirement)
router.get('/search', employeeController.searchEmployees);

module.exports = router;