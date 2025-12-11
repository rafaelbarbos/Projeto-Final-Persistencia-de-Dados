import React from 'react';
import { Paper, Typography, List, ListItem, ListItemText, Button, Box, Divider } from '@mui/material';
import HotelIcon from '@mui/icons-material/Hotel';

const AccommodationList = ({ accommodations }) => {
    if (!accommodations || accommodations.length === 0) return null;

    return (
        <Paper elevation={0} sx={{ p: 3, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
            <Box display="flex" alignItems="center" mb={2}>
                <HotelIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" fontWeight="bold">
                    Onde se hospedar
                </Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <List disablePadding>
                {accommodations.map((acc, index) => (
                    <ListItem
                        key={index}
                        disableGutters
                        sx={{
                            py: 1.5,
                            borderBottom: index !== accommodations.length - 1 ? '1px solid #f0f0f0' : 'none',
                            flexDirection: 'column',
                            alignItems: 'flex-start'
                        }}
                    >
                        <Box width="100%" display="flex" justifyContent="space-between" alignItems="center" mb={0.5}>
                            <Typography variant="subtitle1" fontWeight="medium">
                                {acc.name}
                            </Typography>
                        </Box>
                        <Box width="100%" display="flex" justifyContent="space-between" alignItems="center">
                            <Typography variant="body2" color="success.main" fontWeight="bold">
                                {acc.price}
                            </Typography>
                            <Button
                                variant="outlined"
                                size="small"
                                href={acc.link}
                                target="_blank"
                                sx={{ borderRadius: 5, textTransform: 'none' }}
                            >
                                Reservar
                            </Button>
                        </Box>
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

export default AccommodationList;
