// src/pages/Applicants.tsx
import React from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useParams, useNavigate } from 'react-router-dom';
import { parseEther } from 'ethers'; // Updated imports
import { confirmWork } from '../utils/blockchain';
import { useUserStore } from '../store/userStore';

const Applicants: React.FC = () => {
    const { jobId } = useParams<{ jobId: string }>();
    const navigate = useNavigate();
    const { token } = useUserStore();
    const [applicants, setApplicants] = React.useState([]);

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
        try {
            await axiosInstance.patch(`/job-applications/${jobId}/accept/${applicationId}`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            // Confirm work on the blockchain
            await confirmWork();
            navigate(`/chat/${jobId}/${developerAddress}`);
        } catch (error) {
            console.error('Error accepting applicant:', error);
        }
    };

    return (
        <div>
            <h2>Applicants for Job {jobId}</h2>
            <ul>
                {applicants.map((applicant: any) => (
                    <li key={applicant.id}>
                        {applicant.user.firstName} {applicant.user.lastName}
                        <button onClick={() => handleAccept(applicant.id, applicant.user.walletAddress)}>
                            Accept
                        </button>
                        <button onClick={() => navigate(`/chat/${jobId}/${applicant.user.id}`)}>Chat</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Applicants;
