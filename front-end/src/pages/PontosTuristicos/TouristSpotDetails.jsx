import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import Navbar from '../../components/Layout/Navbar';
import { pointsService } from '../../services';
import HeroSection from '../../components/TouristSpotDetails/HeroSection';
import ImageGallery from '../../components/TouristSpotDetails/ImageGallery';
import AccommodationList from '../../components/TouristSpotDetails/AccommodationList';
import ReviewsSection from '../../components/TouristSpotDetails/ReviewsSection';
import ActionButtons from '../../components/TouristSpotDetails/ActionButtons';
import { Container, Grid, Typography, Button, Box, Link, Breadcrumbs, CircularProgress } from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

const TouristSpotDetails = () => {
    const { id } = useParams();
    const [spot, setSpot] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSpot = async () => {
            setLoading(true);
            try {
                const data = await pointsService.getById(id);
                setSpot(data);
            } catch (error) {
                console.error('Error fetching details:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchSpot();
    }, [id]);

    if (loading) {
        return (
            <Box sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!spot) {
        return (
            <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Navbar />
                <Container maxWidth="md" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Box textAlign="center">
                        <Typography variant="h5" color="text.secondary" gutterBottom>
                            Ponto Turístico não encontrado
                        </Typography>
                        <Button component={RouterLink} to="/" variant="contained">
                            Voltar para a Home
                        </Button>
                    </Box>
                </Container>
            </Box>
        );
    }

    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'grey.50' }}>
            <Navbar />

            <Container maxWidth="lg" sx={{ py: 4, flexGrow: 1 }}>

                <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
                    <Link component={RouterLink} underline="hover" color="inherit" to="/">
                        Home
                    </Link>
                    <Typography color="text.primary">{spot.name}</Typography>
                </Breadcrumbs>

                <Button
                    component={RouterLink}
                    to="/"
                    startIcon={<NavigateBeforeIcon />}
                    sx={{ mb: 3 }}
                    color="inherit"
                >
                    Voltar
                </Button>

                <Grid container spacing={4}>
                    {/* Main Content Column */}
                    <Grid item xs={12} lg={8}>
                        <ImageGallery images={spot.images} />

                        <HeroSection
                            name={spot.name}
                            description={spot.description}
                            city={spot.city}
                            state={spot.state}
                            howToGetThere={spot.howToGetThere}
                            category={spot.category}
                        />

                        <ReviewsSection reviews={spot.reviews} rating={spot.rating} />
                    </Grid>

                    {/* Sidebar Column */}
                    <Grid item xs={12} lg={4}>
                        <Box sx={{ position: { lg: 'sticky' }, top: 24, display: 'flex', flexDirection: 'column', gap: 3 }}>
                            <ActionButtons />
                            <AccommodationList accommodations={spot.accommodations} />
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default TouristSpotDetails;
