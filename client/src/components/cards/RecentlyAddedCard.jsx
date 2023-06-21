import React, { useState } from 'react';

import { Box, Button, Card, CardMedia, Typography, useTheme } from '@mui/material';
import WindowIcon from '@mui/icons-material/Window';

export default function RecentlyAddedCard({ data }) {
    const { id = "",
        title = "",
        thumbnail = "",
        game_url = "",
        genre = "",
        screenshots = [],
    } = data

    // Screenshots valiations. If the data is not in an Array format, then set it as an empty array.
    const validScreenshots = Array.isArray(screenshots) ? screenshots : [];
    const images = [thumbnail, ...validScreenshots.map((image) => image.image)];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    //useTheme hook from MUI. 
    const theme = useTheme()

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' }, // column for small screens, row for larger screens
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            backgroundColor: theme.palette.primary.light,
            transition: 'transform 0.2s ease-in-out',
            ':hover': {
                transform: 'scale(1.1)',
            },
        }}
        >
            <Card sx={{
                position: 'relative',
                width: { xs: '100%', sm: '120px' },
                height: '80px',
                overflow: 'hidden',
            }}>
                {images.map((image, index) => (
                    <CardMedia
                        key={index}
                        component="img"
                        src={image}
                        alt={title}
                        sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "fill",
                            opacity: index === currentImageIndex ? 1 : 0,
                            transition: "opacity 1s linear",
                        }}
                    />
                ))}
            </Card>

            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-evenly',
                alignItems: 'center',
            }}>
                <Typography sx={{ color: theme.palette.primary.extraLight }}>{title}</Typography>
                <Typography sx={{ color: theme.palette.primary.main, backgroundColor: theme.palette.primary.extraLight, borderRadius: '5px', fontSize: '10px' }}>{genre}</Typography>

            </Box>

            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                gap: 0,
            }}>
                <Button>
                    <WindowIcon sx={{ color: theme.palette.primary.extraLight }} />
                </Button>
                <Button size='small' sx={{ backgroundColor: theme.palette.secondary.main, color: 'white' }}>
                    FREE
                </Button>
            </Box>
        </Box>
    );
}