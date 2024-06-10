// src/components/Header.tsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/userStore';

const Header: React.FC = () => {
    const navigate = useNavigate();
    const { user, token, setUser, setToken } = useUserStore();

    const handleLogout = () => {
        setUser(null);
        setToken(null);
        navigate('/');
    };

    const handleLoginClick = () => {
        navigate('/authorization');
    };

    return (
        <AppBar position="static">
            <Container maxWidth="lg">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Freelance App
                    </Typography>
                    <Button color="inherit" component={Link} to="/">Home</Button>
                    <Button color="inherit" component={Link} to="/jobs">Jobs</Button>
                    {token ? (
                        <>
                            <Button color="inherit" component={Link} to="/profile">Profile</Button>
                            {user?.role === 1 && (
                                <>
                                    <Button color="inherit" component={Link} to="/post-job">Post Job</Button>
                                    <Button color="inherit" component={Link} to="/my-jobs">My Jobs</Button>
                                </>
                            )}
                            {user?.role === 2 && (
                                <Button color="inherit" component={Link} to="/freelancer-jobs">My Applications</Button>
                            )}
                            <Button color="inherit" onClick={handleLogout}>Logout</Button>
                        </>
                    ) : (
                        <Button color="inherit" onClick={handleLoginClick}>Login</Button>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;
