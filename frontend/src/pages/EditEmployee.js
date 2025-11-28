import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEmployeeById, updateEmployee } from '../services/api';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';

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
    const [profilePic, setProfilePic] = useState(null); // New file
    const [error, setError] = useState('');

    // 1. Load existing data when page opens
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
        
        // Use FormData again because we might be uploading a new image
        const data = new FormData();
        data.append('first_name', formData.first_name);
        data.append('last_name', formData.last_name);
        data.append('email', formData.email);
        data.append('department', formData.department);
        data.append('position', formData.position);
        data.append('salary', formData.salary);

        // Only append if user selected a NEW file
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
            <Card className="p-4 shadow">
                <h2 className="text-center mb-4">Edit Employee</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control name="first_name" value={formData.first_name || ''} onChange={handleChange} required />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control name="last_name" value={formData.last_name || ''} onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control name="email" value={formData.email || ''} onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Department</Form.Label>
                        <Form.Control name="department" value={formData.department || ''} onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Position</Form.Label>
                        <Form.Control name="position" value={formData.position || ''} onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Salary</Form.Label>
                        <Form.Control name="salary" type="number" value={formData.salary || ''} onChange={handleChange} required />
                    </Form.Group>
                    
                    <Form.Group className="mb-4">
                        <Form.Label>Update Profile Picture (Optional)</Form.Label>
                        <Form.Control type="file" onChange={handleFileChange} />
                    </Form.Group>

                    <Button variant="warning" type="submit" className="w-100">Update Details</Button>
                </Form>
            </Card>
        </Container>
    );
};

export default EditEmployee;