// src/pages/Authorization.tsx
import React, {useEffect, useState} from 'react';
import { Container, Typography, Box, TextField, Button, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/userStore';
import {useAuth} from "../context/AuthContext";

const Authorization: React.FC = () => {
    const navigate = useNavigate();
    const { loginWithMetaMask } = useAuth();
    const { loginWithEmail } = useUserStore();
    const { user } = useUserStore();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if(user?.id){
            navigate('/')
        }
    }, [user])

    const handleMetaMaskLogin = async () => {
        await loginWithMetaMask();
    };

    const handleEmailLogin = () => {
        loginWithEmail(email, password);
    };

    const handleSubmit = () => {
        handleEmailLogin();
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ marginTop: 8, textAlign: 'center' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Authorization
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
                    onClick={handleMetaMaskLogin}
                    sx={{ marginTop: 2 }}
                >
                    Connect with MetaMask
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    sx={{ marginTop: 4 }}
                >
                    Login
                </Button>
                <Box sx={{ marginTop: 4 }}>
                    <Typography variant="body2">
                        Don't have an account? <Link href="/registration">Register here</Link>
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default Authorization;
