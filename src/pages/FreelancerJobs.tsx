// src/pages/FreelancerJobs.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Box, Paper, List, ListItem, ListItemText, Button, ListItemSecondaryAction, CircularProgress, Alert } from '@mui/material';
import { useUserStore } from '../store/userStore';
import { useNavigate } from 'react-router-dom';
import { submitWork } from '../utils/blockchain';

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

interface Contract {
    id: string;
    contractAddress: string;
    clientAddress: string;
    freelancerAddress: string;
    status: string;
    job: Job;
}

interface JobApplication {
    id: string;
    proposal: string;
    status: string;
    job: Job;
    client: Client;
}

const FreelancerJobs: React.FC = () => {
    const [applications, setApplications] = useState<JobApplication[]>([]);
    const [contracts, setContracts] = useState<Contract[]>([]);
    const [loading, setLoading] = useState(false);
    const { user, token } = useUserStore();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                setLoading(true);
                const response = await axios.get('https://freelance-backend-production-beb9.up.railway.app/job-applications', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setApplications(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching job applications:', error);
                setLoading(false);
            }
        };

        const fetchContracts = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:3333/contracts/my-contracts`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setContracts(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching contracts:', error);
                setLoading(false);
            }
        };

        fetchApplications();
        fetchContracts();
    }, [token, user?.walletAddress]);

    const handleChat = (jobId: string, clientId: string) => {
        navigate(`/chat/${jobId}/${clientId}`);
    };

    const handleSubmitWork = async (contractAddress: string, contractId: string) => {
        try {
            setLoading(true);
            await submitWork(contractAddress);
            await axios.patch(`https://freelance-backend-production-beb9.up.railway.app/contracts/${contractId}`, { status: 'work-submitted' }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert('Work submitted successfully');
            setLoading(false);
        } catch (error) {
            console.error('Error submitting work:', error);
            alert('Error submitting work');
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="md">
            <Box sx={{ marginTop: 8, textAlign: 'center' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    My Job Applications
                </Typography>
                {loading && <CircularProgress />}
                {applications.length === 0 && !loading && <Alert severity="info">No job applications found</Alert>}
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
                <Typography variant="h4" component="h1" gutterBottom sx={{ marginTop: 4 }}>
                    My Contracts
                </Typography>
                {contracts.length === 0 && !loading && <Alert severity="info">No contracts found</Alert>}
                <Paper elevation={3} sx={{ padding: 3 }}>
                    <List>
                        {contracts.map((contract) => (
                            <ListItem key={contract.id} divider>
                                <ListItemText
                                    primary={`Job Title: ${contract.job.title}`}
                                    secondary={
                                        <>
                                            <Typography component="span" variant="body2" color="textPrimary">
                                                Budget: ${contract.job.budget}
                                            </Typography>
                                            <br />
                                            <Typography component="span" variant="body2" color="textPrimary">
                                                Status: {contract.status}
                                            </Typography>
                                            <br />
                                            <Typography component="span" variant="body2" color="textPrimary">
                                                Contract Address: {contract.contractAddress}
                                            </Typography>
                                        </>
                                    }
                                />
                                <ListItemSecondaryAction>
                                    {contract.status === 'work-confirmed' && (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleSubmitWork(contract.contractAddress, contract.id)}
                                        >
                                            Submit Work
                                        </Button>
                                    )}
                                    <Button
                                        variant="outlined"
                                        onClick={() => handleChat(contract.job.id, contract.clientAddress)}
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
