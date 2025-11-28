const { connectDB } = require('../config/db'); 
const { ObjectId } = require('mongodb');

// Helper to format output
const formatEmployeeResponse = (employee) => {
    if (!employee) return null;
    const { _id, ...rest } = employee;
    return {
        employee_id: _id.toString(),
        ...rest
    };
};

// 1. GET ALL EMPLOYEES
exports.listEmployees = async (req, res) => {
    try {
        const db = await connectDB();
        const employees = await db.collection('employees').find({}).toArray();
        res.status(200).json(employees.map(formatEmployeeResponse));
    } catch (error) {
        res.status(500).json({ message: 'Server error listing employees.' });
    }
};

// 2. CREATE EMPLOYEE 
exports.createEmployee = async (req, res) => {
    try {
        const db = await connectDB();
        
        const profilePic = req.file ? req.file.filename : null;

        const newEmployee = {
            ...req.body,
            profile_pic: profilePic, 
            created_at: new Date(),
            updated_at: new Date()
        };

        const result = await db.collection('employees').insertOne(newEmployee);
        
        res.status(201).json({
            message: 'Employee created successfully.',
            employee_id: result.insertedId.toString()
        });
        
    } catch (error) {
        console.error("Create Error:", error);
        res.status(500).json({ message: 'Server error creating employee.' });
    }
};

// 3. GET ONE EMPLOYEE
exports.getEmployeeById = async (req, res) => {
    const { eid } = req.params;
    try {
        const db = await connectDB();
        const employee = await db.collection('employees').findOne({ _id: new ObjectId(eid) });

        if (!employee) return res.status(404).json({ message: 'Employee not found.' });

        res.status(200).json(formatEmployeeResponse(employee));
    } catch (error) {
        res.status(500).json({ message: 'Server error retrieving employee.' });
    }
};

// 4. UPDATE EMPLOYEE 
exports.updateEmployee = async (req, res) => {
    const { eid } = req.params;
    try {
        const db = await connectDB();
        
        // Start with the text data
        const updateData = {
            ...req.body,
            updated_at: new Date()
        };

        // If a new image was uploaded, update that too
        if (req.file) {
            updateData.profile_pic = req.file.filename;
        }

        const result = await db.collection('employees').updateOne(
            { _id: new ObjectId(eid) },
            { $set: updateData }
        );

        if (result.matchedCount === 0) return res.status(404).json({ message: 'Employee not found.' });
        
        res.status(200).json({ message: 'Employee details updated successfully.' });
        
    } catch (error) {
        res.status(500).json({ message: 'Server error updating employee.' });
    }
};

// 5. DELETE EMPLOYEE
exports.deleteEmployee = async (req, res) => {
    const { eid } = req.query; // Remember: using query param ?eid=...
    try {
        const db = await connectDB();
        const result = await db.collection('employees').deleteOne({ _id: new ObjectId(eid) });

        if (result.deletedCount === 0) return res.status(404).json({ message: 'Employee not found.' });

        res.status(204).send(); 
    } catch (error) {
        res.status(500).json({ message: 'Server error deleting employee.' });
    }
};

// 6. SEARCH EMPLOYEES 
exports.searchEmployees = async (req, res) => {
    const { q } = req.query; // URL will look like: /search?q=Developer
    try {
        const db = await connectDB();
        
        // Search in Department OR Position
        const employees = await db.collection('employees').find({
            $or: [
                { department: { $regex: q, $options: 'i' } }, // 'i' means case-insensitive
                { position: { $regex: q, $options: 'i' } },
                { first_name: { $regex: q, $options: 'i' } }
            ]
        }).toArray();

        res.status(200).json(employees.map(formatEmployeeResponse));
    } catch (error) {
        console.error("Search Error:", error);
        res.status(500).json({ message: 'Server error searching employees.' });
    }
};