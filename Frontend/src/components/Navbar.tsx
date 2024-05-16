import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ServerLink } from '../ServerLink';

// Custom styled components
const TransparentAppBar = styled(AppBar)({
  backgroundColor: 'transparent',
  transition: 'background-color 0.2s ease',
  '&:hover': {
    backgroundColor: '#EFEBE9'
  }
});

const BlackTypography = styled(Typography)({
  color: 'black'
});

const BlackButton = styled(Button)({
  color: 'black',
  '&:hover': {
    backgroundColor: 'grey'
  }
});

export default function ButtonAppBar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await fetch(`${ServerLink}/auth`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('Stopr_Token')}` // Assuming the token is stored in localStorage
          }
        });
        const data = await response.json();
        setIsAuthenticated(data.valid);
      } catch (error) {
        console.error('Error verifying token:', error);
      }
    };

    verifyToken();
  }, [location]); // Run the effect whenever the location changes

  const handleLogout = () => {
    localStorage.removeItem('Stopr_Token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleDashboard = () => {
    navigate('/dashboard');
  };

  const handleMouseEnter = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
    setHovered(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setHovered(false);
    }, 300); // Adjust the delay as needed
    setHoverTimeout(timeout);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <TransparentAppBar position="static">
        <Toolbar>
          <BlackTypography variant="h6" sx={{ flexGrow: 1 }}>
          <img src={`${process.env.PUBLIC_URL}/images/logo.png`} onClick={() => { navigate('/'); }} alt="Logo" style={{ maxHeight: '40px', marginTop: 6 }} />

          </BlackTypography>
          {isAuthenticated ? (
            <Box
              sx={{ position: 'relative' }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <BlackButton onClick={handleDashboard} sx={{font:"Roboto",fontWeight:"bold"}}>
                Dashboard
              </BlackButton>
              {hovered && (
                <BlackButton
                  sx={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    backgroundColor: 'white',
                    '&:hover': {
                      backgroundColor: 'lightgrey'
                    }
                  }}
                  onClick={handleLogout}
                >
                  Logout
                </BlackButton>
              )}
            </Box>
          ) : (
            <BlackButton sx={{font:"Roboto",fontWeight:"bold"}} onClick={handleLogin}>
              Login
            </BlackButton>
          )}
        </Toolbar>
      </TransparentAppBar>
    </Box>
  );
}
