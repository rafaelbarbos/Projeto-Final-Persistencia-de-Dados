import React, { useState } from 'react';
import { Box, Paper, ImageList, ImageListItem } from '@mui/material';

const ImageGallery = ({ images }) => {
    const [mainImage, setMainImage] = useState(images ? images[0] : '');

    if (!images || images.length === 0) return null;

    return (
        <Box sx={{ mb: 3 }}>
            <Paper
                elevation={0}
                sx={{
                    width: '100%',
                    height: 400,
                    mb: 2,
                    overflow: 'hidden',
                    borderRadius: 2,
                    bgcolor: 'grey.200'
                }}
            >
                <Box
                    component="img"
                    src={mainImage}
                    alt="Vista principal"
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </Paper>

            {images.length > 1 && (
                <ImageList
                    cols={4}
                    gap={8}
                    rowHeight={100}
                    sx={{ m: 0, overflow: 'visible' }}
                >
                    {images.map((img, index) => (
                        <ImageListItem
                            key={index}
                            onClick={() => setMainImage(img)}
                            sx={{
                                cursor: 'pointer',
                                border: mainImage === img ? '2px solid' : '2px solid transparent',
                                borderColor: mainImage === img ? 'primary.main' : 'transparent',
                                borderRadius: 2,
                                overflow: 'hidden',
                                transition: 'all 0.2s',
                                '&:hover': { opacity: 0.8 }
                            }}
                        >
                            <img
                                src={img}
                                alt={`Thumbnail ${index + 1}`}
                                loading="lazy"
                                style={{ height: '100%', objectFit: 'cover' }}
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            )}
        </Box>
    );
};

export default ImageGallery;
