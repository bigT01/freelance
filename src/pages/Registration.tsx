// src/pages/Registration.tsx
import React from 'react';
import { Container, Typography, Box, TextField, Button, Grid, IconButton } from '@mui/material';
import { useUserStore } from '../store/userStore';
import { AssignmentInd, Work } from '@mui/icons-material';

const Registration: React.FC = () => {
    const {
        userName,
        firstName,
        lastName,
        email,
        password,
        role,
        setUserName,
        setFirstName,
        setLastName,
        setEmail,
        setPassword,
        setRole,
        registerUser,
    } = useUserStore();

    const handleRoleSelection = (selectedRole: number) => {
        setRole(selectedRole);
    };

    const handleSubmit = () => {
        registerUser();
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ marginTop: 8, textAlign: 'center' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Registration
                </Typography>
                <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <TextField
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <TextField
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
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
                <Typography variant="h6" component="h2" sx={{ marginTop: 4, marginBottom: 2 }}>
                    Choose Your Role
                </Typography>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item>
                        <IconButton onClick={() => handleRoleSelection(1)} color={role === 1 ? 'primary' : 'default'}>
                            <AssignmentInd />
                        </IconButton>
                        <Typography>Client</Typography>
                    </Grid>
                    <Grid item>
                        <IconButton onClick={() => handleRoleSelection(2)} color={role === 2 ? 'primary' : 'default'}>
                            <Work />
                        </IconButton>
                        <Typography>Freelancer</Typography>
                    </Grid>
                </Grid>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    sx={{ marginTop: 4 }}
                >
                    Register
                </Button>
            </Box>
        </Container>
    );
};

export default Registration;
