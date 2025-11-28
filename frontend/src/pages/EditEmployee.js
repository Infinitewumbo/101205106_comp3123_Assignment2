import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEmployeeById, updateEmployee } from '../services/api';
import { Container, Form, Button, Alert, Card, Row, Col } from 'react-bootstrap';

const EditEmployee = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        department: '',
        position: '',
        salary: '',
    });
    const [profilePic, setProfilePic] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadEmployee = async () => {
            try {
                const response = await getEmployeeById(id);
                setFormData(response.data);
            } catch (err) {
                setError('Failed to load employee data');
            }
        };
        loadEmployee();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setProfilePic(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const data = new FormData();
        data.append('first_name', formData.first_name);
        data.append('last_name', formData.last_name);
        data.append('email', formData.email);
        data.append('department', formData.department);
        data.append('position', formData.position);
        data.append('salary', formData.salary);

        if (profilePic) {
            data.append('profile_pic', profilePic);
        }

        try {
            await updateEmployee(id, data);
            navigate('/employees');
        } catch (err) {
            setError('Error updating employee');
        }
    };

    return (
        <Container className="mt-5">
            <Card className="shadow-lg overflow-hidden">
                <Card.Header className="bg-blue-gradient text-white text-center py-4">
                    <h3 className="mb-0 fw-bold">Edit Employee</h3>
                </Card.Header>
                
                <Card.Body className="p-5">
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-bold">First Name</Form.Label>
                                    <Form.Control name="first_name" value={formData.first_name || ''} onChange={handleChange} required />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-bold">Last Name</Form.Label>
                                    <Form.Control name="last_name" value={formData.last_name || ''} onChange={handleChange} required />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-3">
                            <Form.Label className="fw-bold">Email</Form.Label>
                            <Form.Control name="email" value={formData.email || ''} onChange={handleChange} required />
                        </Form.Group>

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-bold">Department</Form.Label>
                                    <Form.Control name="department" value={formData.department || ''} onChange={handleChange} required />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-bold">Position</Form.Label>
                                    <Form.Control name="position" value={formData.position || ''} onChange={handleChange} required />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-3">
                            <Form.Label className="fw-bold">Salary</Form.Label>
                            <Form.Control name="salary" type="number" value={formData.salary || ''} onChange={handleChange} required />
                        </Form.Group>
                        
                        <Form.Group className="mb-4 p-3 bg-light border rounded">
                            <Form.Label className="fw-bold">Change Profile Picture (Optional)</Form.Label>
                            <Form.Control type="file" onChange={handleFileChange} />
                        </Form.Group>

                        <div className="d-grid gap-2">
                            <Button variant="warning" type="submit" size="lg" className="fw-bold text-white">
                                Update Details
                            </Button>
                            <Button variant="outline-secondary" onClick={() => navigate('/employees')}>
                                Cancel
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default EditEmployee;