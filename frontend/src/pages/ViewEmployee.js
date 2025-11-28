import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEmployeeById } from '../services/api';
import { Container, Card, Button, Spinner, Row, Col } from 'react-bootstrap';

const ViewEmployee = () => {
    const { id } = useParams(); // Get ID from URL
    const navigate = useNavigate();
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await getEmployeeById(id);
                setEmployee(response.data);
            } catch (err) {
                alert('Error fetching employee details');
            }
        };
        fetchEmployee();
    }, [id]);

    if (!employee) return <Container className="mt-5 text-center"><Spinner animation="border" /></Container>;

    return (
        <Container className="mt-5 d-flex justify-content-center">
            <Card style={{ width: '600px' }} className="shadow">
                <Card.Header className="bg-primary text-white text-center">
                    <h3>Employee Details</h3>
                </Card.Header>
                <Card.Body>
                    <div className="text-center mb-4">
                        {/* IMAGE DISPLAY */}
                        {employee.profile_pic ? (
                            <img 
                                src={`http://localhost:5000/uploads/${employee.profile_pic}`} 
                                alt="Profile" 
                                style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #ddd' }} 
                            />
                        ) : (
                            <div className="p-4 border rounded bg-light">No Image</div>
                        )}
                    </div>

                    <Row className="mb-2">
                        <Col><strong>First Name:</strong></Col>
                        <Col>{employee.first_name}</Col>
                    </Row>
                    <Row className="mb-2">
                        <Col><strong>Last Name:</strong></Col>
                        <Col>{employee.last_name}</Col>
                    </Row>
                    <Row className="mb-2">
                        <Col><strong>Email:</strong></Col>
                        <Col>{employee.email}</Col>
                    </Row>
                    <Row className="mb-2">
                        <Col><strong>Department:</strong></Col>
                        <Col>{employee.department}</Col>
                    </Row>
                    <Row className="mb-2">
                        <Col><strong>Position:</strong></Col>
                        <Col>{employee.position}</Col>
                    </Row>
                    <Row className="mb-2">
                        <Col><strong>Salary:</strong></Col>
                        <Col>${employee.salary}</Col>
                    </Row>

                    <div className="mt-4 text-center">
                        <Button variant="secondary" onClick={() => navigate('/employees')}>
                            Back to List
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ViewEmployee;