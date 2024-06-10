// src/pages/EditJob.tsx
import React, { useState } from 'react';
import { Container, Typography, Box, TextField, Button, Paper } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserStore } from '../store/userStore';

const EditJob: React.FC = () => {
    const { jobs, editJob } = useUserStore();
    const navigate = useNavigate();
    const { id } = useParams();
    const job = jobs.find((job) => job.id === id);

    const [title, setTitle] = useState(job?.title || '');
    const [budget, setBudget] = useState(job?.budget || 0);
    const [deadline, setDeadline] = useState(job?.deadline || '');
    const [startDate, setStartDate] = useState(job?.startDate || '');
    const [jobStatus, setJobStatus] = useState(job?.jobStatus || 'ongoing');

    const handleSubmit = () => {
        const updatedJob = {
            ...job,
            title,
            budget,
            deadline,
            startDate,
            postDate: job?.postDate || new Date().toISOString().split('T')[0], // Ensure postDate is always a string
            jobStatus: jobStatus || 'ongoing', // Ensure jobStatus is always a string
        };
        editJob(updatedJob);
        navigate('/my-jobs');
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ marginTop: 8, textAlign: 'center' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Edit Job
                </Typography>
                <Paper elevation={3} sx={{ padding: 3 }}>
                    <TextField
                        label="Job Title"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <TextField
                        label="Budget"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        type="number"
                        value={budget}
                        onChange={(e) => setBudget(Number(e.target.value))}
                    />
                    <TextField
                        label="Deadline"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        type="date"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                    />
                    <TextField
                        label="Start Date"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        sx={{ marginTop: 2 }}
                    >
                        Save Changes
                    </Button>
                </Paper>
            </Box>
        </Container>
    );
};

export default EditJob;
