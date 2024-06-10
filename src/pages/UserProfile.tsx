// src/pages/UserProfile.tsx
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box, Paper, Avatar, Grid } from '@mui/material';
import { useUserStore } from '../store/userStore';

const UserProfile: React.FC = () => {
    const { userId } = useParams();
    const { user, fetchUser } = useUserStore();

    useEffect(() => {
        if (userId) {
            fetchUser(userId);
        }
    }, [fetchUser, userId]);

    return (
        <Container maxWidth="md">
            <Box sx={{ marginTop: 8, textAlign: 'center' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    User Profile
                </Typography>
                {user && (
                    <Paper elevation={3} sx={{ padding: 3 }}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item>
                                <Avatar
                                    alt={user.firstName + ' ' + user.lastName}
                                    src={user.profilePictureURL || '/default-avatar.png'}
                                    sx={{ width: 80, height: 80 }}
                                />
                            </Grid>
                            <Grid item xs>
                                <Typography variant="h5" component="h2">
                                    {user.firstName} {user.lastName}
                                </Typography>
                                <Typography variant="body1" color="textSecondary">
                                    @{user.userName}
                                </Typography>
                                <Typography variant="body1" color="textSecondary">
                                    {user.email}
                                </Typography>
                                <Typography variant="body1" sx={{ marginTop: 2 }}>
                                    {user.bio || 'No bio available'}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                )}
            </Box>
        </Container>
    );
};

export default UserProfile;
