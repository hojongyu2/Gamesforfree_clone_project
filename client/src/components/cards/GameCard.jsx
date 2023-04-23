import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

export default function GameCard({ data }) {
  const {id="",
  title = "", 
  description = "", 
  thumbnail = "", 
  short_description = "",
  game_url = "", 
  genre = "", 
  platform = "", 
  publisher = "", 
  developer = "", 
  release_date = "", 
  freetogame_profile_url = "", 
  images = [], } = data

  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentImageUrl, setCurrentImageUrl] = useState(thumbnail);
  const slideInterval = 2000; // 2 seconds
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (isHovered && images.length > 0) {
      setCurrentImageUrl(images[currentImageIndex]);
      timeoutRef.current = setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, slideInterval);
    } else {
      setCurrentImageUrl(thumbnail);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [isHovered, currentImageIndex, images, thumbnail]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCurrentImageIndex(0);
  };

  return (
    <Card
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{ maxWidth: 245 }}
    >
      <CardMedia
        component="img"
        src={currentImageUrl}
        alt={title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}



