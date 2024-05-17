import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  IconButton,
  ThemeProvider,
  createTheme
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ServerLink } from '../ServerLink';
import AsYouTypeSearch from '../components/SearchBar';
import DeleteIcon from '@mui/icons-material/Delete';

interface Stock {
  symbol: string;
  price?: number | null;
}

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [watchlist, setWatchlist] = useState<Stock[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await fetch(`${ServerLink}/auth`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('Stopr_Token')}`
          }
        });
        const data = await response.json();
        setIsAuthenticated(data.valid);
      } catch (error) {
        console.error('Error verifying token:', error);
      }
    };

    verifyToken();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchWatchlist = async () => {
        try {
          const response = await fetch(`${ServerLink}/watchlist`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('Stopr_Token')}`
            }
          });
          const data = await response.json();
          const watchlistData: string[] = data.watchlists;
          const initialWatchlist = watchlistData.map(symbol => ({ symbol, price: undefined }));
          setWatchlist(initialWatchlist);

          // Fetch prices asynchronously
          watchlistData.forEach(async (symbol) => {
            const price = await getStockValue(symbol);
            setWatchlist(prevWatchlist => prevWatchlist.map(stock =>
              stock.symbol === symbol ? { ...stock, price } : stock
            ));
          });
        } catch (error) {
          console.error('Error fetching watchlist:', error);
        }
      };

      fetchWatchlist();
    }
  }, [isAuthenticated]);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleAddToWatchlist = async (symbol: string) => {
    try {
      const response = await fetch(`${ServerLink}/watchlist/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('Stopr_Token')}`
        },
        body: JSON.stringify({ symbol })
      });
      const data = await response.json();
      const updatedWatchlist: string[] = data.watchlists;
      const newWatchlist = updatedWatchlist.map(symbol => ({ symbol, price: undefined }));
      setWatchlist(newWatchlist);

      // Fetch prices for the new watchlist asynchronously
      updatedWatchlist.forEach(async (symbol) => {
        const price = await getStockValue(symbol);
        setWatchlist(prevWatchlist => prevWatchlist.map(stock =>
          stock.symbol === symbol ? { ...stock, price } : stock
        ));
      });
    } catch (error) {
      console.error('Error adding to watchlist:', error);
    }
  };

  const handleRemoveFromWatchlist = async (symbol: string) => {
    try {
      const response = await fetch(`${ServerLink}/watchlist/remove`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('Stopr_Token')}`
        },
        body: JSON.stringify({ symbol })
      });
      const data = await response.json();
      const updatedWatchlist: string[] = data.watchlists;
      const newWatchlist = updatedWatchlist.map(symbol => ({ symbol, price: undefined }));

      setWatchlist(newWatchlist);

      // Fetch prices for the updated watchlist asynchronously
      updatedWatchlist.forEach(async (symbol) => {
        const price = await getStockValue(symbol);
        setWatchlist(prevWatchlist => prevWatchlist.map(stock =>
          stock.symbol === symbol ? { ...stock, price } : stock
        ));
      });
    } catch (error) {
      console.error('Error removing from watchlist:', error);
    }
  };

  const getStockValue = async (symbol: string): Promise<number | null> => {
    try {
      const apiKey = 'YQKC5RLIBF1VXMGH';
      const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${apiKey}`;

      const response = await fetch(url);
      const data = await response.json();
      const timeSeries = data['Time Series (5min)'];
      if (!timeSeries) {
        console.log('No time series data available for', symbol);
        return null;
      }

      const latestTime = Object.keys(timeSeries)[0];
      if (!latestTime) {
        console.log('No latest time available for', symbol);
        return null;
      }

      const latestPrice = timeSeries[latestTime]['4. close'];
      if (!latestPrice) {
        console.log('No latest price available for', symbol);
        return null;
      }

      return parseFloat(latestPrice);
    } catch (error) {
      console.error('Error fetching stock value:', error);
      return null;
    }
  };

  const renderStockItem = (stock: Stock) => (
    <Grid item xs={12} sm={6} md={3} key={stock.symbol}>
      <Paper sx={{ p: 2, textAlign: 'center', backgroundColor: '#fff' }}>
        <Typography variant="h6" fontWeight="bold">{stock.symbol}</Typography>
        <Typography variant="body1" fontWeight="bold">
          {stock.price !== undefined ? (stock.price !== null ? `$${stock.price.toFixed(2)}` : 'Not available') : 'Loading...'}
        </Typography>
        <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveFromWatchlist(stock.symbol)}>
          <DeleteIcon />
        </IconButton>
      </Paper>
    </Grid>
  );

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          height: '100vh',
          backgroundImage: 'url(https://images.pexels.com/photos/3616764/pexels-photo-3616764.jpeg?auto=compress&cs=tinysrgb&w=800)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(8px)',
          position: 'absolute',
          width: '100%',
          zIndex: -1
        }}
      />
      <Box sx={{ p: 3, position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            position: 'absolute',
            top:45,
            right: 24,
            backgroundColor: 'transparent',
            padding: 2,
            borderRadius: 1,
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'black' }}>
            Add Stocks
          </Typography>
          <AsYouTypeSearch  onAdd={handleAddToWatchlist} />
        </Box>
        <Paper
          sx={{
            p: 4,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: 2,
            mt: 3
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'black' }}>
            Dashboard
          </Typography>
          {isAuthenticated ? (
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'black' }}>My Watchlist</Typography>
              <Grid container spacing={2}>
                {watchlist.length === 0 ? (
                  <Typography variant="body1" sx={{ fontWeight: 'bold',marginTop:8,marginLeft:2,color: 'black' }}>No items in watchlist</Typography>
                ) : (
                  watchlist.map(renderStockItem)
                )}
              </Grid>
            </Box>
          ) : (
            <Button variant="contained" color="primary" onClick={handleLogin}>
              Login
            </Button>
          )}
        </Paper>
      </Box>
    </ThemeProvider>
  );
}
