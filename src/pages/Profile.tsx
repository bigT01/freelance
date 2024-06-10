// src/pages/Profile.tsx
import React from 'react';
import { Container, Typography, Box, Avatar, Grid, Paper, Chip, Divider, Button } from '@mui/material';
import { styled } from '@mui/system';
import { LocationOn, Work, School } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const ProfileContainer = styled(Container)(({ theme }) => ({
    marginTop: theme.spacing(4),
}));

const ProfileHeader = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(4),
}));

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
    width: theme.spacing(15),
    height: theme.spacing(15),
    marginRight: theme.spacing(3),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
    fontWeight: 'bold',
}));

const Profile: React.FC = () => {
    const { userAddress } = useAuth();

    return (
        <ProfileContainer maxWidth="lg">
            <Paper elevation={3} sx={{ padding: 4 }}>
                <ProfileHeader>
                    <ProfileAvatar alt="User Name" src="/path/to/avatar.jpg" />
                    <Box>
                        <Typography variant="h4" component="div">
                            John Doe
                        </Typography>
                        <Typography variant="h6" color="textSecondary">
                            Full Stack Developer
                        </Typography>
                        {userAddress && (
                            <Typography variant="body1" color="textSecondary">
                                Address: {userAddress}
                            </Typography>
                        )}
                        <Typography variant="body1" color="textSecondary" sx={{ display: 'flex', alignItems: 'center' }}>
                            <LocationOn sx={{ marginRight: 1 }} /> New York, USA
                        </Typography>
                    </Box>
                </ProfileHeader>
                <Divider />

                <SectionTitle variant="h5">About Me</SectionTitle>
                <Typography variant="body1" paragraph>
                    Passionate Full Stack Developer with over 5 years of experience in developing web applications. Proficient in JavaScript, React, Node.js, and other modern web technologies.
                </Typography>

                <Divider />

                <SectionTitle variant="h5">Skills</SectionTitle>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {['JavaScript', 'React', 'Node.js', 'TypeScript', 'MongoDB', 'GraphQL'].map((skill) => (
                        <Chip key={skill} label={skill} variant="outlined" />
                    ))}
                </Box>

                <Divider />

                <SectionTitle variant="h5">Experience</SectionTitle>
                <Box sx={{ marginBottom: 2 }}>
                    <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
                        <Work sx={{ marginRight: 1 }} /> Senior Developer at XYZ Corp
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Jan 2020 - Present
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Leading a team of developers to build scalable web applications using React and Node.js.
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
                        <Work sx={{ marginRight: 1 }} /> Junior Developer at ABC Inc
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Jun 2017 - Dec 2019
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Worked on various client projects, developing front-end components and integrating APIs.
                    </Typography>
                </Box>

                <Divider />

                <SectionTitle variant="h5">Education</SectionTitle>
                <Box>
                    <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
                        <School sx={{ marginRight: 1 }} /> Bachelor of Science in Computer Science
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        University of Technology, 2013 - 2017
                    </Typography>
                </Box>

                <Box sx={{ marginTop: 4 }}>
                    <Button variant="contained" color="primary" sx={{ marginRight: 2 }}>
                        Edit Profile
                    </Button>
                    <Button variant="outlined" color="primary">
                        Contact
                    </Button>
                </Box>
            </Paper>
        </ProfileContainer>
    );
};

export default Profile;
