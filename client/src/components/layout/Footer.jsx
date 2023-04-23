import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: (theme) => theme.palette.primary.main,
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-evenly',
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
              <Typography variant="body1" component="div">
                <Link href="#" color="inherit">
                  {item}
                </Link>
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
