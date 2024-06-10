// src/pages/MyJobs.tsx
import React, { useEffect } from 'react';
import { Container, Typography, Box, Paper, List, ListItem, ListItemText, Button, ListItemSecondaryAction } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/userStore';

const MyJobs: React.FC = () => {
    const { jobs, fetchMyJobs, deleteJob } = useUserStore();
    const navigate = useNavigate();

    useEffect(() => {
        fetchMyJobs();
    }, [fetchMyJobs]);

    const handleViewApplicants = (jobId: string) => {
        navigate(`/applicants/${jobId}`);
    };

    const handleDelete = (jobId: string) => {
        deleteJob(jobId);
    };

    return (
        <Container maxWidth="md">
            <Box sx={{ marginTop: 8, textAlign: 'center' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    My Jobs
                </Typography>
                <Paper elevation={3} sx={{ padding: 3 }}>
                    <List>
                        {jobs.map((job) => (
                            <ListItem key={job.id} divider>
                                <ListItemText
                                    primary={job.title}
                                    secondary={
                                        <>
                                            <Typography component="span" variant="body2" color="textPrimary">
                                                Budget: ${job.budget} - Deadline: {job.deadline}
                                            </Typography>
                                            <br />
                                            <Typography component="span" variant="body2" color="textPrimary">
                                                Status: {job.jobStatus} - Start Date: {job.startDate}
                                            </Typography>
                                        </>
                                    }
                                />
                                <ListItemSecondaryAction>
                                    <Button variant="outlined" color="primary" onClick={() => handleViewApplicants(job.id || '')}>
                                        View Applicants
                                    </Button>
                                    <Button variant="outlined" color="secondary" onClick={() => handleDelete(job.id || '')} sx={{ marginLeft: 1 }}>
                                        Delete
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

export default MyJobs;
