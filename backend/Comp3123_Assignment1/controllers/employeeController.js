// Use connectDB and ObjectId for native driver operations
const { connectDB } = require('../config/db'); 
const { ObjectId } = require('mongodb');

const formatEmployeeResponse = (employee) => {
    if (!employee) return null;
    
    // Convert _id to the required employee_id string
    const { _id, ...rest } = employee;
    return {
        employee_id: _id.toString(),
        ...rest
    };
};

// GET /api/v1/emp/employees - List all employees (Status 200)
exports.listEmployees = async (req, res) => {
    try {
        const db = await connectDB();
        const employees = await db.collection('employees').find({}).toArray();

        // Format the entire list
        const formattedEmployees = employees.map(formatEmployeeResponse);
        
        res.status(200).json(formattedEmployees);
        
    } catch (error) {
        console.error('List Employees Error:', error);
        res.status(500).json({ status: false, message: 'Server error listing employees.' });
    }
};

// POST /api/v1/emp/employees - Create a new employee (Status 201)
exports.createEmployee = async (req, res) => {
    try {
        const db = await connectDB();
        
        // Prepare new employee document (validation ensures fields are present)
        const newEmployee = {
            ...req.body,
            // Ensure date is stored as a Date object if needed, otherwise string is fine per schema
            date_of_joining: new Date(req.body.date_of_joining), 
            created_at: new Date(),
            updated_at: new Date()
        };

        const result = await db.collection('employees').insertOne(newEmployee);
        
        // Return the required 201 Created response
        res.status(201).json({
            message: 'Employee created successfully.',
            employee_id: result.insertedId.toString()
        });
        
    } catch (error) {
        console.error('Create Employee Error:', error);
        res.status(500).json({ status: false, message: 'Server error creating employee.' });
    }
};

// GET /api/v1/emp/employees/{eid} - Get one employee by ID (Status 200)
exports.getEmployeeById = async (req, res) => {
    const { eid } = req.params;

    try {
        const db = await connectDB();
        
        // Use the ObjectId wrapper for ID lookup
        const employee = await db.collection('employees').findOne({ 
            _id: new ObjectId(eid) 
        });

        if (!employee) {
            return res.status(404).json({ status: false, message: 'Employee not found.' });
        }

        // Return the required 200 OK response, formatted
        res.status(200).json(formatEmployeeResponse(employee));
        
    } catch (error) {
        // This catches errors like invalid ObjectId format (handled by validation middleware too)
        console.error('Get Employee Error:', error);
        res.status(500).json({ status: false, message: 'Server error retrieving employee.' });
    }
};

// PUT /api/v1/emp/employees/{eid} - Update an employee by ID (Status 200)
exports.updateEmployee = async (req, res) => {
    const { eid } = req.params;
    
    // Data to update, plus the updated_at timestamp
    const updateData = {
        ...req.body,
        updated_at: new Date()
    };

    try {
        const db = await connectDB();
        
        const result = await db.collection('employees').updateOne(
            { _id: new ObjectId(eid) },
            { $set: updateData }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ status: false, message: 'Employee not found.' });
        }
        
        // Return the required 200 OK response
        res.status(200).json({
            message: 'Employee details updated successfully.'
        });
        
    } catch (error) {
        console.error('Update Employee Error:', error);
        res.status(500).json({ status: false, message: 'Server error updating employee.' });
    }
};

// DELETE /api/v1/emp/employees?eid=xxx - Delete an employee by ID (Status 204)
exports.deleteEmployee = async (req, res) => {
    // ID is accessed via req.query.eid because the route is structured with a query parameter
    const { eid } = req.query;

    try {
        const db = await connectDB();
        
        const result = await db.collection('employees').deleteOne({ 
            _id: new ObjectId(eid) 
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({ status: false, message: 'Employee not found.' });
        }

        // CRITICAL: Return 204 No Content, with NO response body
        res.status(204).send(); 
        
    } catch (error) {
        console.error('Delete Employee Error:', error);
        res.status(500).json({ status: false, message: 'Server error deleting employee.' });
    }
};