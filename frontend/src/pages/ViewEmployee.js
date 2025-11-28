import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEmployeeById } from '../services/api';
import { Container, Card, Button, Spinner, Row, Col } from 'react-bootstrap';

const ViewEmployee = () => {
    const { id } = useParams();
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

    if (!employee) return (
        <Container className="mt-5 text-center">
            <Spinner animation="border" variant="primary" />
        </Container>
    );

    return (
        <Container className="mt-5 d-flex justify-content-center">
            <Card style={{ width: '600px' }} className="shadow-lg overflow-hidden">
                <Card.Header className="bg-blue-gradient text-white text-center py-4">
                    <h3 className="mb-0 fw-bold">Employee Details</h3>
                </Card.Header>
                
                <Card.Body className="p-4">
                    <div className="text-center mb-5">
                        {employee.profile_pic ? (
                            <img 
                                src={`http://localhost:5000/uploads/${employee.profile_pic}`} 
                                alt="Profile" 
                                className="shadow"
                                style={{ 
                                    width: '180px', 
                                    height: '180px', 
                                    borderRadius: '50%', 
                                    objectFit: 'cover', 
                                    border: '5px solid #fff',
                                    boxShadow: '0 0 15px rgba(0,0,0,0.2)'
                                }} 
                            />
                        ) : (
                            <div 
                                className="d-flex align-items-center justify-content-center mx-auto bg-light text-secondary fw-bold border"
                                style={{ width: '150px', height: '150px', borderRadius: '50%' }}
                            >
                                No Image
                            </div>
                        )}
                    </div>

                    <div className="px-4">
                        <Row className="mb-3 border-bottom pb-2">
                            <Col xs={5} className="text-muted fw-bold text-uppercase small">Full Name</Col>
                            <Col xs={7} className="fw-bold text-dark">{employee.first_name} {employee.last_name}</Col>
                        </Row>
                        <Row className="mb-3 border-bottom pb-2">
                            <Col xs={5} className="text-muted fw-bold text-uppercase small">Email</Col>
                            <Col xs={7} className="text-primary">{employee.email}</Col>
                        </Row>
                        <Row className="mb-3 border-bottom pb-2">
                            <Col xs={5} className="text-muted fw-bold text-uppercase small">Department</Col>
                            <Col xs={7}>{employee.department}</Col>
                        </Row>
                        <Row className="mb-3 border-bottom pb-2">
                            <Col xs={5} className="text-muted fw-bold text-uppercase small">Position</Col>
                            <Col xs={7}>{employee.position}</Col>
                        </Row>
                        <Row className="mb-3 border-bottom pb-2">
                            <Col xs={5} className="text-muted fw-bold text-uppercase small">Salary</Col>
                            <Col xs={7} className="text-success fw-bold">${employee.salary}</Col>
                        </Row>
                    </div>

                    <div className="mt-5 text-center d-grid gap-2">
                        <Button variant="outline-primary" size="lg" onClick={() => navigate('/employees')}>
                            Back to List
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ViewEmployee;