// src/pages/Authorization.tsx
import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, TextField, Button, Link, Card, CardContent, Grid, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/userStore';
import { useAuth } from "../context/AuthContext";

const Authorization: React.FC = () => {
    const navigate = useNavigate();
    const { loginWithMetaMask } = useAuth();
    const { loginWithEmail } = useUserStore();
    const { user } = useUserStore();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (user?.id) {
            navigate('/')
        }
    }, [user, navigate])

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
                <Card>
                    <CardContent>
                        <Typography variant="h4" component="h1" gutterBottom>
                            Authorization
                        </Typography>
                        <Box component="form" sx={{ mt: 2 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Email"
                                        variant="outlined"
                                        fullWidth
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Password"
                                        type="password"
                                        variant="outlined"
                                        fullWidth
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        onClick={handleSubmit}
                                    >
                                        Login with Email
                                    </Button>
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider>OR</Divider>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        fullWidth
                                        onClick={handleMetaMaskLogin}
                                    >
                                        Connect with MetaMask
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box sx={{ marginTop: 4 }}>
                            <Typography variant="body2">
                                Don't have an account? <Link href="/registration">Register here</Link>
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
};

export default Authorization;
