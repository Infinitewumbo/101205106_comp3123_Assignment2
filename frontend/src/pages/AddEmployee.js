import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addEmployee } from '../services/api'; 
import { Container, Form, Button, Row, Col, Alert, Card } from 'react-bootstrap';

const AddEmployee = () => {
    const navigate = useNavigate();

    // 1. State for all fields
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [department, setDepartment] = useState('');
    const [position, setPosition] = useState('');
    const [salary, setSalary] = useState('');
    const [dateOfJoining, setDateOfJoining] = useState('');
    const [error, setError] = useState('');
    
    // 2. Special State for the File
    const [profilePic, setProfilePic] = useState(null);

    // 3. Handle File Change
    const handleFileChange = (e) => {
        setProfilePic(e.target.files[0]); // We only take the first file
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // 4. PREPARE FORM DATA (Crucial for Image Uploads)
        const formData = new FormData();
        formData.append('first_name', firstName);
        formData.append('last_name', lastName);
        formData.append('email', email);
        formData.append('department', department);
        formData.append('position', position);
        formData.append('salary', salary);
        formData.append('date_of_joining', dateOfJoining);
        
        // Only append image if user selected one
        if (profilePic) {
            // 'profile_pic' MUST match the name in your Backend Route: upload.single('profile_pic')
            formData.append('profile_pic', profilePic); 
        }

        try {
            await addEmployee(formData); // Send to Backend
            navigate('/employees');      // Redirect to Dashboard
        } catch (err) {
            setError('Error adding employee. Please check your inputs.');
            console.error(err);
        }
    };

    return (
        <Container className="mt-5">
            <Card className="shadow p-4">
                <h2 className="mb-4 text-center">Add New Employee</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                
                <Form onSubmit={handleSubmit} encType="multipart/form-data">
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    value={firstName} 
                                    onChange={(e) => setFirstName(e.target.value)} 
                                    required 
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    value={lastName} 
                                    onChange={(e) => setLastName(e.target.value)} 
                                    required 
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                    </Form.Group>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Department</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    value={department} 
                                    onChange={(e) => setDepartment(e.target.value)} 
                                    required 
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Position</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    value={position} 
                                    onChange={(e) => setPosition(e.target.value)} 
                                    required 
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Salary</Form.Label>
                                <Form.Control 
                                    type="number" 
                                    value={salary} 
                                    onChange={(e) => setSalary(e.target.value)} 
                                    required 
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Date of Joining</Form.Label>
                                <Form.Control 
                                    type="date" 
                                    value={dateOfJoining} 
                                    onChange={(e) => setDateOfJoining(e.target.value)} 
                                    required 
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* IMAGE UPLOAD FIELD */}
                    <Form.Group className="mb-4">
                        <Form.Label>Profile Picture</Form.Label>
                        <Form.Control 
                            type="file" 
                            onChange={handleFileChange} 
                        />
                    </Form.Group>

                    <div className="d-grid gap-2">
                        <Button variant="primary" type="submit" size="lg">
                            Save Employee
                        </Button>
                        <Button variant="secondary" onClick={() => navigate('/employees')}>
                            Cancel
                        </Button>
                    </div>
                </Form>
            </Card>
        </Container>
    );
};

export default AddEmployee;