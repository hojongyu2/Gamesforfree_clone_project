import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link, useTheme } from '@mui/material';

export default function HomePageGetStarted() {
  const theme = useTheme()

  return (
    <Card
      sx={{
        width:'100vw',
        height:'20vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage:
        "linear-gradient(rgb(60, 60, 60), rgba(0, 0, 0, 0.7)), url('https://img.freepik.com/premium-vector/game-neon-signs-style-text_118419-2733.jpg?w=1060')",
      }}
    >
      
      <CardContent>
        <Typography variant="h5" component="div" sx={{ color: theme.palette.primary.extraLight }} >
          Discover the best free-to-play games!
        </Typography>
        <Typography sx={{ mb: 1.5, color: theme.palette.primary.extraLight }}>
          adjective
        </Typography>
      </CardContent>
      <CardActions>
        <Link href={'/login'} sx={{textDecoration: 'none'}}>
          <Button variant="contained" color="info" size="small">
            GET STARTED It's free
          </Button>
        </Link>
        <Link href={'/all/mmorpg'} sx={{textDecoration: 'none'}}>
          <Button variant="outlined" size="small" sx={{ color: theme.palette.primary.extraLight }}>
            Browse Games
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
