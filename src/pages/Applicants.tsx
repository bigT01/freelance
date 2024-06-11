// src/pages/Applicants.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUserStore } from '../store/userStore';
import {deployContract, approveWork, submitWork, cancelContract, confirmWork} from '../utils/blockchain';
import { Container, Typography, Button, Paper, Box, List, ListItem, ListItemText, CircularProgress, Alert } from '@mui/material';
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
        walletAddress?: string;
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

interface Contract {
    id: string;
    contractAddress: string;
    clientAddress: string;
    freelancerAddress: string;
    job: {
        id: string;
        title: string;
        budget: number;
        deadline: string;
        postDate: string;
        jobStatus: string;
        startDate: string;
    };
    status: string;
}

const Applicants: React.FC = () => {
    const { jobId } = useParams<{ jobId: string }>();
    const { token, user } = useUserStore();
    const [applicants, setApplicants] = useState<Applicant[]>([]);
    const [contracts, setContracts] = useState<Contract[]>([]);
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

        const fetchContracts = async () => {
            try {
                const response = await axiosInstance.get('contracts', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setContracts(response.data);
            } catch (error) {
                console.error('Error fetching contracts:', error);
            }
        };

        fetchApplicants();
        fetchContracts();
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

            const contractAddr = await deployContract(developerAddress || '', (paymentAmount / 1000).toString());
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


    const handleApproveWork = async (contract: Contract) => {
        if (!contract.contractAddress) {
            alert('Contract address is not available.');
            return;
        }

        try {
            setLoading(true);
            await approveWork(contract.contractAddress);
            alert('Work approved successfully');

            // Update contract status in backend
            await axiosInstance.patch(`contracts/${contract.id}`, {
                status: 'work-approved'
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setLoading(false);
        } catch (error) {
            console.error('Error approving work:', error);
            alert('Error approving work');
            setLoading(false);
        }
    };

    const handleCancelContract = async (contract: Contract) => {
        if (!contract.contractAddress) {
            alert('Contract address is not available.');
            return;
        }

        try {
            setLoading(true);
            await cancelContract(contract.contractAddress);
            alert('Contract cancelled successfully');

            // Update contract status in backend
            await axiosInstance.patch(`contracts/${contract.id}`, {
                status: 'cancelled'
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setLoading(false);
        } catch (error) {
            console.error('Error cancelling contract:', error);
            alert('Error cancelling contract');
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
            <Typography variant="h4" component="h1" gutterBottom>
                Contracts
            </Typography>
            {contracts.length === 0 && !loading && <Alert severity="info">No contracts found</Alert>}
            <List>
                {contracts.map((contract) => (
                    <ListItem key={contract.id}>
                        <Paper elevation={3} style={{ width: '100%', padding: '1em' }}>
                            <ListItemText
                                primary={`${contract.job.title}`}
                                secondary={`Status: ${contract.status}`}
                            />
                            <Box display="flex" justifyContent="flex-end" gap={2}>
                                {contract.status === 'work-submitted' && (
                                    <>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleApproveWork(contract)}
                                            disabled={loading}
                                        >
                                            Approve Work
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => handleCancelContract(contract)}
                                            disabled={loading}
                                        >
                                            Cancel Contract
                                        </Button>
                                    </>
                                )}
                            </Box>
                        </Paper>
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default Applicants;
