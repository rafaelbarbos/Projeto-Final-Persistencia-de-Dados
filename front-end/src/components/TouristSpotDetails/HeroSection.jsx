import React from 'react';
import { Paper, Typography, Box, Chip, Alert, AlertTitle } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DirectionsIcon from '@mui/icons-material/Directions';

const HeroSection = ({ name, description, city, state, howToGetThere, category }) => {
    return (
        <Paper elevation={0} sx={{ p: 3, borderRadius: 2, mb: 3, border: '1px solid', borderColor: 'divider' }}>
            <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                <Box>
                    <Typography variant="h4" component="h1" fontWeight="bold" color="text.primary" gutterBottom>
                        {name}
                    </Typography>
                    <Box display="flex" alignItems="center" color="text.secondary">
                        <LocationOnIcon fontSize="small" sx={{ mr: 0.5 }} />
                        <Typography variant="subtitle1">
                            {city}, {state}
                        </Typography>
                    </Box>
                </Box>
                {category && <Chip label={category} color="primary" variant="outlined" />}
            </Box>

            <Box mb={3}>
                <Typography variant="h6" gutterBottom fontWeight="600">
                    Sobre
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                    {description}
                </Typography>
            </Box>

            {howToGetThere && (
                <Alert severity="info" icon={<DirectionsIcon fontSize="inherit" />} sx={{ '& .MuiAlert-message': { width: '100%' } }}>
                    <AlertTitle>Como chegar</AlertTitle>
                    {howToGetThere}
                </Alert>
            )}
        </Paper>
    );
};

export default HeroSection;
