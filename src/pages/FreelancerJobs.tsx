// src/pages/FreelancerJobs.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Box, Paper, List, ListItem, ListItemText, Button, ListItemSecondaryAction } from '@mui/material';
import { useUserStore } from '../store/userStore';
import { useNavigate } from 'react-router-dom';

interface Client {
    id: string;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
}

interface Job {
    id: string;
    title: string;
    budget: number;
    deadline: string;
    postDate: string;
    jobStatus: string;
    startDate: string;
}

interface JobApplication {
    id: string;
    proposal: string;
    status: string;
    job: Job;
    client: Client
}

const FreelancerJobs: React.FC = () => {
    const [applications, setApplications] = useState<JobApplication[]>([]);
    const { user, token } = useUserStore();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await axios.get('https://freelance-backend-production-beb9.up.railway.app/job-applications', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setApplications(response.data);
            } catch (error) {
                console.error('Error fetching job applications:', error);
            }
        };

        fetchApplications();
    }, [token]);

    const handleChat = (jobId: string, clientId: string) => {
        navigate(`/chat/${jobId}/${clientId}`);
    };

    return (
        <Container maxWidth="md">
            <Box sx={{ marginTop: 8, textAlign: 'center' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    My Job Applications
                </Typography>
                <Paper elevation={3} sx={{ padding: 3 }}>
                    <List>
                        {applications.map((application) => (
                            <ListItem key={application.id} divider>
                                <ListItemText
                                    primary={`Job Title: ${application.job.title}`}
                                    secondary={
                                        <>
                                            <Typography component="span" variant="body2" color="textPrimary">
                                                Budget: ${application.job.budget}
                                            </Typography>
                                            <br />
                                            <Typography component="span" variant="body2" color="textPrimary">
                                                Status: {application.status}
                                            </Typography>
                                            {application.client && (
                                                <>
                                                    <br />
                                                    <Typography component="span" variant="body2" color="textPrimary">
                                                        Client: {application.client.firstName} {application.client.lastName} ({application.client.userName})
                                                    </Typography>
                                                </>
                                            )}
                                        </>
                                    }
                                />
                                <ListItemSecondaryAction>
                                    <Button
                                        variant="outlined"
                                        onClick={() => handleChat(application.job.id, application.client.id)}
                                    >
                                        Chat
                                    </Button>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            </Box>
        </Container>
    );
};

export default FreelancerJobs;
