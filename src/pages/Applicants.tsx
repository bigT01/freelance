import React from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useParams, useNavigate } from 'react-router-dom';
import { parseEther } from 'ethers';
import { deployContract, confirmWork } from '../utils/blockchain';
import { useUserStore } from '../store/userStore';
import {
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button,
    Card, CardContent, CardActions, Typography, Container, Grid
} from '@mui/material';

const Applicants: React.FC = () => {
    const { jobId } = useParams<{ jobId: string }>();
    const navigate = useNavigate();
    const { token, user } = useUserStore();
    const [applicants, setApplicants] = React.useState([]);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [dialogMessage, setDialogMessage] = React.useState('');

    React.useEffect(() => {
        const fetchApplicants = async () => {
            try {
                const response = await axiosInstance.get(`/job-applications/job/${jobId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setApplicants(response.data);
            } catch (error) {
                console.error('Error fetching applicants:', error);
            }
        };
        fetchApplicants();
    }, [jobId, token]);

    const handleAccept = async (applicationId: string, developerAddress: string) => {
        if (!user?.walletAddress) {
            setDialogMessage('You do not have a wallet address. Please connect your wallet.');
            setOpenDialog(true);
            return;
        }

        if (!developerAddress) {
            setDialogMessage('The freelancer does not have a wallet address.');
            setOpenDialog(true);
            return;
        }

        try {
            // Step 1: Deploy the contract
            const contractAddress = await deployContract(developerAddress, parseEther('0.1')); // Adjust the payment amount as needed

            // Step 2: Confirm work with the client as the signer
            if (typeof contractAddress === 'string') {
                await confirmWork(contractAddress);
            }

            // Step 3: Accept the freelancer in the backend
            await axiosInstance.patch(`/job-applications/${jobId}/accept/${applicationId}`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });

            navigate(`/chat/${jobId}/${developerAddress}`);
        } catch (error) {
            console.error('Error accepting applicant:', error);
        }
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Applicants for Job {jobId}
            </Typography>
            <Grid container spacing={3}>
                {applicants.map((applicant: any) => (
                    <Grid item xs={12} sm={6} md={4} key={applicant.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">
                                    {applicant.user.firstName} {applicant.user.lastName}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {applicant.user.email}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    Proposal: {applicant.proposal}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleAccept(applicant?.walletAddress, applicant.user.walletAddress)}
                                >
                                    Accept
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={() => navigate(`/chat/${jobId}/${applicant.user.id}`)}
                                >
                                    Chat
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>{"Wallet Address Missing"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{dialogMessage}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">OK</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Applicants;
