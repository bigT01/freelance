// src/components/JobList.tsx
import React from 'react';
import { List, ListItem, ListItemText, Container, Paper, Typography } from '@mui/material';
import { styled } from '@mui/system';

const JobListContainer = styled(Container)(({ theme }) => ({
    marginTop: theme.spacing(4),
}));

const JobItem = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
}));

const JobList: React.FC = () => {
    const jobs = [
        { id: 1, title: 'Frontend Developer', description: 'Looking for a React developer' },
        { id: 2, title: 'Backend Developer', description: 'Looking for a Node.js developer' },
        { id: 3, title: 'Full Stack Developer', description: 'Looking for a Full Stack developer' },
        { id: 4, title: 'UX/UI Designer', description: 'Looking for a UX/UI Designer' },
        // Add more jobs here
    ];

    return (
        <JobListContainer maxWidth="lg">
            <List>
                {jobs.map((job) => (
                    <JobItem key={job.id} elevation={3}>
                        <ListItem>
                            <ListItemText
                                primary={<Typography variant="h6">{job.title}</Typography>}
                                secondary={job.description}
                            />
                        </ListItem>
                    </JobItem>
                ))}
            </List>
        </JobListContainer>
    );
};

export default JobList;
