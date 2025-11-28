import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getEmployees, deleteEmployee } from '../services/api';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    // 1. Fetch data when the page loads
    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await getEmployees();
            setEmployees(response.data);
        } catch (err) {
            alert('Failed to fetch employees. Please log in again.');
            navigate('/'); // Redirect to login if token is expired
        }
    };

    // 2. Handle Delete
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this employee?")) {
            try {
                await deleteEmployee(id);
                fetchEmployees(); // Refresh list after delete
            } catch (err) {
                alert('Error deleting employee');
            }
        }
    };

    // 3. Handle Logout
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
                        <tr key={emp._id}>
                            <td>{emp.first_name}</td>
                            <td>{emp.last_name}</td>
                            <td>{emp.email_id || emp.email}</td>
                            <td>
                                <Button 
                                    variant="info" 
                                    size="sm" 
                                    className="me-2"
                                    onClick={() => navigate(`/employees/view/${emp._id}`)}
                                >
                                    View
                                </Button>
                                <Button 
                                    variant="warning" 
                                    size="sm" 
                                    className="me-2"
                                    onClick={() => navigate(`/employees/edit/${emp._id}`)}
                                >
                                    Edit
                                </Button>
                                <Button 
                                    variant="danger" 
                                    size="sm"
                                    onClick={() => handleDelete(emp._id)}
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