import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

export default function GameCard({ title, description, thumbnail, videoSrc }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    
    <Card
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{ maxWidth: 245 }}
    >
      <CardMedia
        component="video"
        src={isHovered ? videoSrc : thumbnail}
        title={title}
        autoPlay={isHovered}
        loop
        muted
        sx={{
          height: 0,
          paddingTop: '56.25%', // 16:9 aspect ratio
        }}
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


