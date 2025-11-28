
const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const { protect } = require('../middleware/auth'); // JWT protection
const { validateEmployee, validateMongoId } = require('../middleware/employeeValidation'); 


// GET /api/v1/emp/employees
router.get('/employees', employeeController.listEmployees);

// POST /api/v1/emp/employees
router.post('/employees', validateEmployee, employeeController.createEmployee);

// GET /api/v1/emp/employees/{eid}
router.get('/employees/:eid', validateMongoId('param'), employeeController.getEmployeeById);

// PUT /api/v1/emp/employees/{eid}
router.put('/employees/:eid', validateMongoId('param'), validateEmployee, employeeController.updateEmployee);

// DELETE /api/v1/emp/employees?eid=xxx
// Note: We use the query('eid') check here instead of param
router.delete('/employees', validateMongoId('query'), employeeController.deleteEmployee);

module.exports = router;