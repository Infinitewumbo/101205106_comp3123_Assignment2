import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addEmployee } from '../services/api'; 
import { Container, Form, Button, Row, Col, Alert, Card } from 'react-bootstrap';

const AddEmployee = () => {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [department, setDepartment] = useState('');
    const [position, setPosition] = useState('');
    const [salary, setSalary] = useState('');
    const [dateOfJoining, setDateOfJoining] = useState('');
    const [error, setError] = useState('');
    
    const [profilePic, setProfilePic] = useState(null);

    const handleFileChange = (e) => {
        setProfilePic(e.target.files[0]); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
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
            formData.append('profile_pic', profilePic); 
        }

        try {
            await addEmployee(formData); 
            navigate('/employees');      
        } catch (err) {
            setError('Error adding employee. Please check your inputs.');
            console.error(err);
        }
    };

    return (
        <Container className="mt-5">
            <Card className="shadow-lg">
                <Card.Header className="bg-blue-gradient text-white p-3">
                     <h3 className="mb-0"><i className="bi bi-person-plus-fill me-2"></i>Add New Employee</h3>
                </Card.Header>
                <Card.Body className="p-4">
                    {error && <Alert variant="danger">{error}</Alert>}
                    
                    <Form onSubmit={handleSubmit} encType="multipart/form-data">

                         <div className="d-grid gap-2 mt-4">
                            <Button variant="primary" type="submit" size="lg" className="fw-bold">
                                Save Employee
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

export default AddEmployee;