import React from 'react';
import { useUserStore } from '../store/userStore';
import { Container, Typography, Box, Avatar, Grid, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
    const { user } = useUserStore();
    const navigate = useNavigate();

    const handleEditProfile = () => {
        navigate('/edit-profile');
    };

    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <Avatar
                        alt={user?.firstName + ' ' + user?.lastName}
                        src={user?.profilePictureURL || '/default-profile.png'}
                        sx={{ width: 100, height: 100, marginBottom: 2 }}
                    />
                    <Typography variant="h4">
                        {user?.firstName} {user?.lastName}
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                        @{user?.userName}
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ marginTop: 2 }}
                        onClick={handleEditProfile}
                    >
                        Edit Profile
                    </Button>
                </Box>
                <Box sx={{ marginTop: 4 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h6">Email</Typography>
                            <Typography variant="body1">{user?.email}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h6">Bio</Typography>
                            <Typography variant="body1">{user?.bio || 'No bio available.'}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h6">Wallet Address</Typography>
                            <Typography variant="body1">{user?.walletAddress || 'No wallet address connected.'}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h6">Role</Typography>
                            <Typography variant="body1">{user?.role === 1 ? 'Client' : 'Freelancer'}</Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Container>
    );
};

export default Profile;
