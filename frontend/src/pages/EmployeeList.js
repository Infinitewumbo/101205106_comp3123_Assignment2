import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getEmployees, deleteEmployee } from '../services/api';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await getEmployees();
            setEmployees(response.data);
        } catch (err) {
            console.error("Fetch Error:", err);
            // Don't redirect immediately so we can see the error if it happens
        }
    };

    const handleDelete = async (id) => {
        // e.stopPropagation() prevents clicking the row when deleting
        if (window.confirm("Are you sure you want to delete this employee?")) {
            try {
                await deleteEmployee(id);
                // Remove from local list immediately so we don't have to reload
                setEmployees(employees.filter(emp => emp.employee_id !== id));
            } catch (err) {
                alert('Error deleting employee');
            }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <Container className="mt-5">
            <Row className="mb-4">
                <Col>
                    <h2>Employee List</h2>
                </Col>
                <Col className="text-end">
                    <Button variant="primary" className="me-2" onClick={() => navigate('/employees/add')}>
                        Add Employee
                    </Button>
                    <Button variant="secondary" onClick={handleLogout}>
                        Logout
                    </Button>
                </Col>
            </Row>
            
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((emp) => (
                        <tr key={emp.employee_id}> 
                            {/* FIX: Use employee_id instead of _id */}
                            <td>{emp.first_name}</td>
                            <td>{emp.last_name}</td>
                            <td>{emp.email}</td>
                            <td>
                                <Button 
                                    variant="info" 
                                    size="sm" 
                                    className="me-2"
                                    onClick={() => navigate(`/employees/view/${emp.employee_id}`)}
                                >
                                    View
                                </Button>
                                <Button 
                                    variant="warning" 
                                    size="sm" 
                                    className="me-2"
                                    onClick={() => navigate(`/employees/edit/${emp.employee_id}`)}
                                >
                                    Edit
                                </Button>
                                <Button 
                                    variant="danger" 
                                    size="sm"
                                    onClick={() => handleDelete(emp.employee_id)}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default EmployeeList;