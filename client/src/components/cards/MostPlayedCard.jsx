import React, { useState, useRef } from 'react';
import { Box, Card, CardMedia, useTheme } from '@mui/material';

export default function MostPlayedCard({ data }) {
    const {id = "",
        thumbnail = "",
        game_url = "",
        screenshots = [],
    } = data

    // Screenshots valiations. If the data is not in an Array format, then set it as an empty array.
    const validScreenshots = Array.isArray(screenshots) ? screenshots : [];
    const images = [thumbnail, ...validScreenshots.map((image) => image.image)];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const intervalRef = useRef(null); // This useRef will store value. 
    //In this case, It will store the interval created by the setInterval. 
    //This allows you to access the current interval value across renders without causing a re-render when the interval reference changes.

    const cardRef = useRef(null);

    const theme = useTheme()

    const handleMouseEnter = () => {
        intervalRef.current = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 1500);
    };

    const handleMouseLeave = () => {
        clearInterval(intervalRef.current);
    };

    return (
        <Box ref={cardRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} sx={{
            display: 'flex',
            flexWrap: 'wrap',
            width: { xs: '100px', sm: '200px', md: '300px' },
            backgroundColor: theme.palette.primary.light,
            marginBottom: '20px',
            transition: 'transform 0.2s ease-in-out',
            ':hover': {
                transform: 'scale(1.1)',
            },
        }}>
            <Card sx={{
                position: 'relative', width: '300px', height: '200px', overflow: 'hidden',
                [theme.breakpoints.down('md')]: { // Styles for screens smaller than 'md' breakpoint
                    width: '200px',
                    height: '100px',
                },
                [theme.breakpoints.down('sm')]: { // Styles for screens smaller than 'sm' breakpoint
                    width: '100px',
                    height: '100px',
                },
            }}>
                {images.map((image, index) => (
                    <CardMedia
                        key={index}
                        component="img"
                        src={image}
                        alt={"title"}
                        sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            position: "absolute",
                            opacity: index === currentImageIndex ? 1 : 0,
                            transition: "opacity 1s linear",
                        }}
                    />
                ))}
            </Card>
        </Box>
    );
}