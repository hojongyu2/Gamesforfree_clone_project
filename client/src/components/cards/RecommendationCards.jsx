import React, { useState } from 'react';
import { Button, Card, CardContent, CardMedia, Link, Typography, useTheme } from '@mui/material';

export default function RecommendationCards({ data }) {
  const { id = "",
    title = "",
    thumbnail = "",
    images = [], } = data

  const [currentImageUrl, setCurrentImageUrl] = useState(thumbnail);

  const theme = useTheme()

  return (
    <Card
      sx={{
        maxWidth: 300,
        transition: 'transform 0.2s ease-in-out',
        ':hover': {
          transform: 'scale(1.05)',
        },
      }}
    >
      <Link href={`/${id}`} sx={{textDecorationLine: 'none'}}>
        <CardMedia
          component="img"
          src={currentImageUrl}
          alt={title}
        />
        <CardContent sx={{ display: 'flex', flexDirection:'row', justifyContent:'center', backgroundColor: (theme) => theme.palette.primary.light }} >
          <Typography
            variant="body2"
            component="div"
            sx={{
              flex: 1, // Set the flex property to 1 to ensure the title takes up all available space
              overflow: 'hidden', // Add this property to prevent the title from overflowing
              textOverflow: 'ellipsis', // Add this property to add an ellipsis when the title overflows
              whiteSpace: 'nowrap', // Add this property to prevent line breaks in the title
              color: theme.palette.primary.extraLight
            }}
          >
            {title}
          </Typography>
          <Button size='small' sx={{ backgroundColor:theme.palette.secondary.main, color: 'white'  }}>free</Button>
        </CardContent>
      </Link>
    </Card>
  );
}



