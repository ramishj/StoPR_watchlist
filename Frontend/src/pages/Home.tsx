import React from 'react';
import { Box, Button, Typography } from '@mui/material';

 export const Home: React.FC = () => {
  return (
    <Box sx={{ height: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Background Image */}
      <Box
        component="div"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url(https://images.pexels.com/photos/7567441/pexels-photo-7567441.jpeg?auto=compress&cs=tinysrgb&w=800)', // Double-check URL
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(8px)',
          zIndex: -2,
        }}
      />
      {/* Overlay */}
      <Box
        component="div"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: -1,
        }}
      />
      {/* Content */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          color: 'white',
          textAlign: 'center',
          padding: '0 20px',
          zIndex: 1,
        }}
      >
        <Typography variant="h1" sx={{ fontSize: '4rem', fontWeight: 700 }}>
          Welcome to Your StoPR Watchlist Tracker
        </Typography>
        <Typography variant="body1" sx={{ fontSize: '1.5rem', margin: '20px 0' }}>
          Keep track of your favorite stocks easily.
        </Typography>
        <Button
        onClick={() => {
          window.location.href = '/register';
        }}
          variant="contained"
          sx={{
            padding: '10px 20px',
            fontSize: '1rem',
            color: 'white',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            border: '1px solid white',
            borderRadius: '5px',
            textDecoration: 'none',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            },
          }}
        >
          Get Started
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
