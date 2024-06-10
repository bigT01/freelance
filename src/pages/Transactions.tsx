// src/pages/Transactions.tsx

import React from 'react';
import { Container, Typography, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const transactions = [
    { date: '2023-06-01', amount: '0.5 ETH', status: 'Completed' },
    { date: '2023-05-20', amount: '1.2 ETH', status: 'Pending' },
    { date: '2023-05-15', amount: '0.3 ETH', status: 'Completed' },
    // Add more transactions as needed
];

const Transactions: React.FC = () => {
    return (
        <Container maxWidth="lg">
            <Box sx={{ marginTop: 8, textAlign: 'center' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Transaction History
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {transactions.map((transaction, index) => (
                                <TableRow key={index}>
                                    <TableCell>{transaction.date}</TableCell>
                                    <TableCell>{transaction.amount}</TableCell>
                                    <TableCell>{transaction.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Container>
    );
};

export default Transactions;
