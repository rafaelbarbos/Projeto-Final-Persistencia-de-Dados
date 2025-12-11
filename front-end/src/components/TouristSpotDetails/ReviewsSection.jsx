import React, { useState } from 'react';
import { Paper, Typography, Box, Rating, List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider, TextField, Button } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import StarIcon from '@mui/icons-material/Star';

const ReviewsSection = ({ reviews, rating }) => {
    const [newComment, setNewComment] = useState('');
    const [newRating, setNewRating] = useState(0);

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (newRating === 0) {
            alert("Por favor, selecione uma nota de 1 a 5 estrelas.");
            return;
        }
        alert(`Comentário enviado com sucesso! Nota: ${newRating}, Texto: ${newComment}`);
        setNewComment('');
        setNewRating(0);
    };

    return (
        <Paper elevation={0} sx={{ p: 3, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h6" fontWeight="bold">
                    Avaliações
                </Typography>
                <Box display="flex" alignItems="center" bgcolor="warning.light" px={1.5} py={0.5} borderRadius={2}>
                    <Typography variant="h6" fontWeight="bold" color="warning.contrastText" sx={{ mr: 0.5 }}>
                        {rating}
                    </Typography>
                    <StarIcon sx={{ color: 'warning.contrastText' }} />
                </Box>
            </Box>

            <List sx={{ mb: 4 }}>
                {reviews && reviews.map((review, index) => (
                    <React.Fragment key={review.id}>
                        <ListItem alignItems="flex-start" disableGutters>
                            <ListItemAvatar>
                                <Avatar sx={{ bgcolor: 'secondary.main' }}>
                                    <PersonIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <Box display="flex" justifyContent="space-between">
                                        <Typography component="span" variant="subtitle1" fontWeight="bold">
                                            {review.user}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {review.date}
                                        </Typography>
                                    </Box>
                                }
                                secondary={
                                    <React.Fragment>
                                        <Box display="flex" alignItems="center" my={0.5}>
                                            <Rating value={review.rating} readOnly size="small" />
                                        </Box>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            {review.comment}
                                        </Typography>
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        {index < reviews.length - 1 && <Divider component="li" />}
                    </React.Fragment>
                ))}
            </List>

            <Box component="form" onSubmit={handleCommentSubmit} sx={{ mt: 2 }}>
                <Typography variant="subtitle1" gutterBottom fontWeight="medium">
                    Deixe seu comentário
                </Typography>

                <Box display="flex" alignItems="center" mb={2}>
                    <Typography component="legend" sx={{ mr: 1, color: 'text.secondary' }}>Sua avaliação:</Typography>
                    <Rating
                        name="simple-controlled"
                        value={newRating}
                        onChange={(event, newValue) => {
                            setNewRating(newValue);
                        }}
                    />
                </Box>

                <TextField
                    fullWidth
                    multiline
                    rows={3}
                    placeholder="Conte sobre sua experiência..."
                    variant="outlined"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    sx={{ mb: 2, bgcolor: 'background.paper' }}
                />
                <Button
                    variant="contained"
                    type="submit"
                    disableElevation
                    disabled={!newComment || !newRating}
                >
                    Enviar Comentário
                </Button>
            </Box>
        </Paper>
    );
};

export default ReviewsSection;
