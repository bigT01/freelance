// src/pages/Jobs.tsx
import React, { useEffect } from 'react';
import { Container, Typography, Box, Paper, List, ListItem, ListItemText, Button, ListItemSecondaryAction } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/userStore';

const Jobs: React.FC = () => {
    const { jobs, fetchAllJobs } = useUserStore();
    const navigate = useNavigate();

    useEffect(() => {
        fetchAllJobs();
    }, [fetchAllJobs]);

    const handleViewDetails = (jobId: string) => {
        navigate(`/job-details/${jobId}`);
    };

    return (
        <Container maxWidth="md">
            <Box sx={{ marginTop: 8, textAlign: 'center' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    All Jobs
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
                                            <br />
                                            <Typography component="span" variant="body2" color="textPrimary">
                                                Posted by: {job.client?.firstName} {job.client?.lastName} ({job.client?.email})
                                            </Typography>
                                        </>
                                    }
                                />
                                <ListItemSecondaryAction>
                                    <Button variant="outlined" color="primary" onClick={() => handleViewDetails(job.id || '')}>
                                        View Details
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

export default Jobs;
