// src/components/Footer.tsx
import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Footer: React.FC = () => {
    return (
        <Box sx={{ bgcolor: 'background.paper', py: 3, mt: 'auto', borderTop: '1px solid #e0e0e0' }} component="footer">
            <Container maxWidth="lg">
                <Typography variant="body2" color="textSecondary" align="center">
                    © 2024 Freelance App. All rights reserved.
                </Typography>
            </Container>
        </Box>
    );
};

export default Footer;
