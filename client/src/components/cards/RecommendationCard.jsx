import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

export default function RecommendationCard() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 2,
          width: {
            xs: '100%',
            sm: '50%', // 50% width on sm and up
            md: '33.33%', // 33.33% width on md and up
            lg: '25%', // 25% width on lg and up
            xl: '20%'
          },
          height: '50vw',
        },
      }}
    >
      <Paper elevation={3} />
      <Paper elevation={3} />
      <Paper elevation={3} />
    </Box>
  );
}
