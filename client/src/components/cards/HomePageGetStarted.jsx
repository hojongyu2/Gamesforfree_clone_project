import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function HomePageGetStarted() {
  return (
    <Card sx={{ minWidth: 275, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >
      <CardContent>
        <Typography variant="h5" component="div">
        Discover the best free-to-play games!
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="outlined" color='success' size="small">GET STARTED It's free</Button>
        <Button variant="outlined" color='success' size="small">Browse Games</Button>
      </CardActions>
    </Card>
  );
}
