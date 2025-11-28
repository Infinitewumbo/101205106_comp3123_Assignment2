import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signup } from '../services/api';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup({ username, email, password });
            alert("Signup successful! Please log in.");
            navigate('/'); 
        } catch (err) {
             // Extract error message from backend if available
            const msg = err.response?.data?.message || 'Error signing up. Try a different username/email.';
            setError(msg);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <Card style={{ width: '450px' }} className="shadow-lg">
                <Card.Header className="bg-success text-white text-center py-3" style={{ background: 'linear-gradient(135deg, #198754 0%, #146c43 100%)' }}>
                    <h3 className="mb-0">Create Account</h3>
                </Card.Header>
                <Card.Body className="p-4">
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-bold text-success">Username</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Choose a username" 
                                value={username}
                                onChange={(e) => setUsername(e.target.value)} 
                                required 
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="fw-bold text-success">Email</Form.Label>
                            <Form.Control 
                                type="email" 
                                placeholder="name@company.com" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                            />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label className="fw-bold text-success">Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="••••••••" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                            />
                        </Form.Group>

                        <Button variant="success" type="submit" className="w-100 btn-lg">
                            Sign Up
                        </Button>
                    </Form>
                    <div className="mt-3 text-center">
                        <small>Already have an account? <Link to="/" className="fw-bold text-success">Login</Link></small>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Signup;