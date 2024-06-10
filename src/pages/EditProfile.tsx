import React, { useState, useEffect } from 'react';
import { useUserStore } from '../store/userStore';
import { Container, TextField, Button, Typography, Box, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

const EditProfile: React.FC = () => {
    const { user, setUser, token } = useUserStore();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        bio: user?.bio || '',
        walletAddress: user?.walletAddress || '',
    });

    useEffect(() => {
        if (!user) {
            navigate('/profile');
        }
    }, [user, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async () => {
        try {
            const response = await axiosInstance.patch(`/user/${user?.id}`, formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUser(response.data);
            navigate('/profile');
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Edit Profile
                </Typography>
                <Box sx={{ marginBottom: 2 }}>
                    <TextField
                        label="First Name"
                        name="firstName"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Last Name"
                        name="lastName"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Email"
                        name="email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Bio"
                        name="bio"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        multiline
                        rows={4}
                        value={formData.bio}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Wallet Address"
                        name="walletAddress"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={formData.walletAddress}
                        onChange={handleChange}
                    />
                </Box>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Save Changes
                </Button>
            </Paper>
        </Container>
    );
};

export default EditProfile;
