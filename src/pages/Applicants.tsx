import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUserStore } from '../store/userStore';
import { deployContract, confirmWork } from '../utils/blockchain';
import { Container, Typography, Button, Paper, Box, List, ListItem, ListItemText, CircularProgress, Alert } from '@mui/material';
import {parseUnits} from "ethers";
import axiosInstance from "../utils/axiosInstance";

interface Applicant {
    id: string;
    proposal: string;
    status: string;
    user: {
        id: string;
        userName: string;
        firstName: string;
        lastName: string;
        email: string;
        walletAddress ?: string
    };
    job: {
        id: string;
        title: string;
        budget: number;
        deadline: string;
        postDate: string;
        jobStatus: string;
        startDate: string;
    };
}

const Applicants: React.FC = () => {
    const { jobId } = useParams<{ jobId: string }>();
    const { token, user } = useUserStore();
    const [applicants, setApplicants] = useState<Applicant[]>([]);
    const [loading, setLoading] = useState(false);
    const [contractAddress, setContractAddress] = useState<string | null>(null);

    useEffect(() => {
        const fetchApplicants = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get(`job-applications/job/${jobId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setApplicants(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching applicants:', error);
                setLoading(false);
            }
        };

        fetchApplicants();
    }, [jobId, token]);

    const handleDeployContract = async (applicant: Applicant) => {
        try {
            if (!applicant.user || !applicant.job) {
                alert('Applicant or job information is missing.');
                return;
            }

            setLoading(true);
            const developerAddress = applicant.user?.walletAddress; // Assuming user ID is used for developer address
            const paymentAmount = applicant.job.budget; // Assuming budget is the payment amount

            const contractAddr = await deployContract(developerAddress || '', parseUnits('0.0001', 'ether'));
            if (contractAddr) {
                setContractAddress(contractAddr);

                // Save contract address to the backend
                await axiosInstance.post('contracts', {
                    contractAddress: contractAddr,
                    clientAddress: user?.walletAddress, // Replace with actual client address
                    freelancerAddress: developerAddress,
                    jobId: applicant.job.id,
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                alert('Contract deployed successfully');
            } else {
                alert('Failed to deploy contract');
            }
            setLoading(false);
        } catch (error) {
            console.error('Error deploying contract:', error);
            alert('Error deploying contract');
            setLoading(false);
        }
    };

    const handleConfirmWork = async () => {
        if (!contractAddress) {
            alert('Contract address is not available. Deploy the contract first.');
            return;
        }

        try {
            setLoading(true);
            await confirmWork(contractAddress);
            alert('Work confirmed successfully');
            setLoading(false);
        } catch (error) {
            console.error('Error confirming work:', error);
            alert('Error confirming work');
            setLoading(false);
        }
    };

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                Applicants
            </Typography>
            {loading && <CircularProgress />}
            {applicants.length === 0 && !loading && <Alert severity="info">No applicants found</Alert>}
            <List>
                {applicants.map((applicant) => (
                    <ListItem key={applicant.id}>
                        <Paper elevation={3} style={{ width: '100%', padding: '1em' }}>
                            <ListItemText
                                primary={`${applicant.user.firstName} ${applicant.user.lastName}`}
                                secondary={applicant.proposal}
                            />
                            <Box display="flex" justifyContent="flex-end" gap={2}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleDeployContract(applicant)}
                                    disabled={loading}
                                >
                                    Deploy Contract
                                </Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={handleConfirmWork}
                                    disabled={!contractAddress || loading}
                                >
                                    Confirm Work
                                </Button>
                            </Box>
                        </Paper>
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default Applicants;
