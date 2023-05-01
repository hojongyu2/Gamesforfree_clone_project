import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';
import gamesforfree3 from '../../assets/gamesforfree3.png'

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: (theme) => theme.palette.primary.dark,
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-evenly',
              flexGrow: 1,
            }}
          >
            {[
              'About Us',
              'API',
              'Contact Us',
              'Help/FAQ',
              'Support & Bugs',
              'Sitemap',
              'Privacy Policy',
              'Cookies Policy',
              'Terms of Use',
            ].map((item, index) => (
              <Box
                key={index}
                sx={{
                  flexBasis: 'calc(33.33% - 32px)',
                  mb: 2,
                  mx: 1,
                  textAlign: 'center',
                }}
              >
                <Typography variant="body1" component="div" color='white'>
                  <Link href="#" color="inherit">
                    {item}
                  </Link>
                </Typography>
              </Box>
            ))}
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <img src={gamesforfree3} alt="Games for Free Logo" style={{ width: '100px', borderRadius: '50%', marginRight: '10px' }} />
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mt: 4,
          }}
        >
          <Typography variant="body2" color="white">
            © 2023 This site is a clone of FreeToGame. All trademarks are property of their respective owners.
          </Typography>
        </Box>
      </Container>
    </Box>
    
  );
};

export default Footer;
