// src/pages/PostJob.tsx
import React, { useState } from 'react';
import { Container, Typography, Box, TextField, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/userStore';

const PostJob: React.FC = () => {
    const { postJob } = useUserStore();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [budget, setBudget] = useState(0);
    const [deadline, setDeadline] = useState('');
    const [startDate, setStartDate] = useState('');
    const postDate = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

    const handleSubmit = () => {
        const job = {
            title,
            budget,
            deadline,
            postDate,
            jobStatus: 'ongoing',
            startDate,
        };
        postJob(job);
        navigate('/');
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ marginTop: 8, textAlign: 'center' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Post a Job
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
                        Post Job
                    </Button>
                </Paper>
            </Box>
        </Container>
    );
};

export default PostJob;
