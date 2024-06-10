// src/pages/JobDetails.tsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box, Paper, Button, Modal, TextField } from '@mui/material';
import { useUserStore } from '../store/userStore';
import axios from 'axios';

const JobDetails: React.FC = () => {
    const { id } = useParams();
    const { jobs, user, token } = useUserStore();
    const job = jobs.find((job) => job.id === id);
    const [open, setOpen] = useState(false);
    const [proposal, setProposal] = useState('');
    const [applications, setApplications] = useState([]);

    if (!job) {
        return (
            <Container maxWidth="sm">
                <Box sx={{ marginTop: 8, textAlign: 'center' }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Job not found
                    </Typography>
                </Box>
            </Container>
        );
    }

    const handleApply = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post(`https://freelance-backend-production-beb9.up.railway.app/job-applications/${job.id}`, { proposal }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setApplications(response.data);
            setOpen(false);
        } catch (error) {
            console.error('Error submitting proposal:', error);
        }
    };

    return (
        <Container maxWidth="md">
            <Box sx={{ marginTop: 8, textAlign: 'center' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    {job.title}
                </Typography>
                <Paper elevation={3} sx={{ padding: 3 }}>
                    <Typography variant="body1" gutterBottom>
                        <strong>Budget:</strong> ${job.budget}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        <strong>Deadline:</strong> {job.deadline}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        <strong>Status:</strong> {job.jobStatus}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        <strong>Start Date:</strong> {job.startDate}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        <strong>Posted on:</strong> {job.postDate}
                    </Typography>
                    <Typography variant="h5" component="h2" gutterBottom>
                        Client Information
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        <strong>Name:</strong> {job.client?.firstName} {job.client?.lastName}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        <strong>Email:</strong> {job.client?.email}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        <strong>Username:</strong> {job.client?.userName}
                    </Typography>
                    {user?.role === 2 ? (
                        <Button variant="contained" color="primary" onClick={handleApply} sx={{ marginTop: 2 }}>
                            Apply
                        </Button>
                    ) : (
                        <Button variant="contained" color="primary" disabled sx={{ marginTop: 2 }}>
                            Apply
                        </Button>
                    )}
                </Paper>
            </Box>
            <Modal open={open} onClose={handleClose}>
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                    <Typography variant="h6" component="h2" gutterBottom>
                        Submit Proposal
                    </Typography>
                    <TextField
                        label="Proposal"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        value={proposal}
                        onChange={(e) => setProposal(e.target.value)}
                        sx={{ marginBottom: 2 }}
                    />
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Box>
            </Modal>
        </Container>
    );
};

export default JobDetails;
