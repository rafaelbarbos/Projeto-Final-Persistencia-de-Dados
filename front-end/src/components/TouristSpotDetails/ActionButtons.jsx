import React from 'react';
import { Paper, Button, Stack } from '@mui/material';
import RateReviewIcon from '@mui/icons-material/RateReview';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

const ActionButtons = () => {
    const handleRate = () => {
        // Mock logic
        const loggedIn = false;
        if (!loggedIn) {
            alert("Você precisa estar logado para avaliar.");
        }
    };

    const handleUpload = () => {
        alert("Funcionalidade de upload de fotos.");
    };

    return (
        <Paper elevation={0} sx={{ p: 3, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
            <Stack spacing={2}>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<RateReviewIcon />}
                    onClick={handleRate}
                    fullWidth
                    sx={{ py: 1.5, fontWeight: 'bold', boxShadow: 2 }}
                >
                    Avaliar Ponto Turístico
                </Button>
                <Button
                    variant="outlined"
                    color="inherit"
                    size="large"
                    startIcon={<AddAPhotoIcon />}
                    onClick={handleUpload}
                    fullWidth
                >
                    Enviar Foto
                </Button>
            </Stack>
        </Paper>
    );
};

export default ActionButtons;
