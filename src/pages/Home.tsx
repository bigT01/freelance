// src/pages/Home.tsx
import React from 'react';
import {Container, Typography, Box, Grid, Paper, Avatar, List, ListItem, ListItemText, Divider} from '@mui/material';
import { styled } from '@mui/system';
import JobList from '../components/JobList';

const HomeContainer = styled(Container)(({ theme }) => ({
    marginTop: theme.spacing(4),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
    fontWeight: 'bold',
}));

const StatBox = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: 'center',
}));

const PartnerAvatar = styled(Avatar)(({ theme }) => ({
    width: theme.spacing(10),
    height: theme.spacing(10),
    margin: theme.spacing(1),
}));

const HeroSection = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(8, 2),
    textAlign: 'center',
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(4),
}));

const partners = [
    { name: 'Partner 1', logo: '/path/to/logo1.png' },
    { name: 'Partner 2', logo: '/path/to/logo2.png' },
    { name: 'Partner 3', logo: '/path/to/logo3.png' },
    { name: 'Partner 4', logo: '/path/to/logo4.png' },
];

const Home: React.FC = () => {
    return (
        <HomeContainer maxWidth="lg">
            {/*<HeroSection>*/}
                <Typography variant="h3" component="h1" gutterBottom>
                    Welcome to Freelance App
                </Typography>
                <Typography variant="h6" color="inherit">
                    Connect with top freelancers and clients from around the world.
                </Typography>
            {/*</HeroSection>*/}

            <Grid container spacing={4} sx={{ marginBottom: 4 }}>
                <Grid item xs={12} sm={4}>
                    <StatBox>
                        <Typography variant="h4" color="primary">100k+</Typography>
                        <Typography variant="body1">Freelancers</Typography>
                    </StatBox>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <StatBox>
                        <Typography variant="h4" color="primary">50k+</Typography>
                        <Typography variant="body1">Clients</Typography>
                    </StatBox>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <StatBox>
                        <Typography variant="h4" color="primary">1M+</Typography>
                        <Typography variant="body1">Jobs Posted</Typography>
                    </StatBox>
                </Grid>
            </Grid>

            <SectionTitle variant="h5">Our Partners</SectionTitle>
            <Grid container spacing={2} sx={{ justifyContent: 'center', marginBottom: 4 }}>
                {partners.map((partner) => (
                    <Grid item key={partner.name}>
                        <PartnerAvatar alt={partner.name} src={partner.logo} />
                    </Grid>
                ))}
            </Grid>

            <Divider sx={{ my: 4 }} />

            <SectionTitle variant="h5">Popular Jobs</SectionTitle>
            <JobList />
        </HomeContainer>
    );
};

export default Home;
