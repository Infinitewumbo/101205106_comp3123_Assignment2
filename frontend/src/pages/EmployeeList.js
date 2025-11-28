import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Row, Col, Form, InputGroup, Card } from 'react-bootstrap'; // Added Card
import { useNavigate } from 'react-router-dom';
import { getEmployees, deleteEmployee, searchEmployees } from '../services/api';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
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
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            if (searchQuery.trim() === '') {
                fetchEmployees(); 
            } else {
                const response = await searchEmployees(searchQuery);
                setEmployees(response.data);
            }
        } catch (err) {
            alert("Error searching employees");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this employee?")) {
            try {
                await deleteEmployee(id);
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
            <Card className="shadow-sm">
                <Card.Body className="p-4">
                    <Row className="mb-4 align-items-center">
                        <Col md={4}>
                            <h2 className="text-primary fw-bold mb-0">Employee List</h2>
                        </Col>
                        
                        <Col md={4}>
                            <Form onSubmit={handleSearch}>
                                <InputGroup>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Search Dept. or Position..." 
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    <Button variant="primary" type="submit">
                                        Search
                                    </Button>
                                </InputGroup>
                            </Form>
                        </Col>

                        <Col md={4} className="text-end">
                            <Button variant="success" className="me-2 fw-bold" onClick={() => navigate('/employees/add')}>
                                + Add Employee
                            </Button>
                            <Button variant="outline-secondary" onClick={handleLogout}>
                                Logout
                            </Button>
                        </Col>
                    </Row>
                    
                    <Table hover responsive className="table-blue-header align-middle">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Department</th>
                                <th>Position</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.length > 0 ? (
                                employees.map((emp) => (
                                    <tr key={emp.employee_id}>
                                        <td className="fw-bold">{emp.first_name}</td>
                                        <td>{emp.last_name}</td>
                                        <td><span className="badge bg-light text-dark border">{emp.department}</span></td>
                                        <td>{emp.position}</td>
                                        <td className="text-center">
                                            <Button variant="outline-primary" size="sm" className="me-1" onClick={() => navigate(`/employees/view/${emp.employee_id}`)}>
                                                View
                                            </Button>
                                            <Button variant="outline-warning" size="sm" className="me-1" onClick={() => navigate(`/employees/edit/${emp.employee_id}`)}>
                                                Edit
                                            </Button>
                                            <Button variant="outline-danger" size="sm" onClick={() => handleDelete(emp.employee_id)}>
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center py-4 text-muted">
                                        No employees found. Add one to get started!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default EmployeeList;