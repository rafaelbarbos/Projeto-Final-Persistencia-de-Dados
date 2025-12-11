import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, CardActions, Button, Rating, Box, Chip, IconButton } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Link } from 'react-router-dom';

const PointCard = ({ point }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    return (
        <Card sx={{ width: 300, maxWidth: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardMedia
                component="img"
                height="180"
                image={point.image || "https://source.unsplash.com/random/800x600/?tourist,landmark"}
                alt={point.name}
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                    <Typography gutterBottom variant="h6" component="div" sx={{ lineHeight: 1.2 }}>
                        {point.name}
                    </Typography>
                    <Chip label={point.category} size="small" variant="outlined" color="primary" />
                </Box>

                <Box display="flex" alignItems="center" mb={1}>
                    <LocationOnIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
                    <Typography variant="body2" color="text.secondary">
                        {point.city}, {point.state}
                    </Typography>
                </Box>

                <Box display="flex" alignItems="center">
                    <Rating value={point.rating} readOnly precision={0.5} size="small" />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                        ({point.rating})
                    </Typography>
                </Box>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites" onClick={() => setIsFavorite(!isFavorite)} color={isFavorite ? "error" : "default"}>
                    {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
                <Button
                    size="small"
                    fullWidth
                    variant="contained"
                    component={Link}
                    to={`/detalhes/${point.id}`}
                    sx={{ ml: 'auto' }}
                >
                    Saiba Mais
                </Button>
            </CardActions>
        </Card>
    );
};

export default PointCard;
