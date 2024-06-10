// src/pages/Login.tsx
import React, { useState } from 'react';
import { Container, Typography, Box, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const { loginWithEmail } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<string>('');

    const handleEmailLogin = () => {
        loginWithEmail(email, password, role);
        navigate('/');
    };

    const handleAuthorizationRedirect = () => {
        navigate('/authorization');
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ marginTop: 8, textAlign: 'center' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Login
                </Typography>
                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleEmailLogin}
                    sx={{ marginTop: 2 }}
                >
                    Login
                </Button>
                <Typography variant="body1" sx={{ marginTop: 2 }}>
                    Don't have an account?
                </Typography>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleAuthorizationRedirect}
                    sx={{ marginTop: 1 }}
                >
                    Sign Up
                </Button>
            </Box>
        </Container>
    );
};

export default Login;
