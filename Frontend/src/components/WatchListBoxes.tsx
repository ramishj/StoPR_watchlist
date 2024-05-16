import * as React from 'react';
import { Grid } from '@mui/material'; // Import Grid component from Material-UI
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardActions from '@mui/joy/CardActions';
import CircularProgress from '@mui/joy/CircularProgress';
import Typography from '@mui/joy/Typography';
import SvgIcon from '@mui/joy/SvgIcon';

interface StockCardProps {
  stockSymbol: string;
  stockValue: string;
  removeFromWatchList: () => void;
  
}

const StockCard: React.FC<StockCardProps> = ({ stockSymbol, stockValue, removeFromWatchList }) => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card variant="solid" color="primary" invertedColors sx={{ display: 'flex', flexDirection: 'row', margin: "10px", width:"30%" }}>
        <CircularProgress size="lg" determinate value={20}>
          <SvgIcon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
              />
            </svg>
          </SvgIcon>
        </CircularProgress>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <Typography level="body-md">Stock Symbol</Typography>
          <Typography level="h2">{stockSymbol}</Typography>
          <Typography level="body-md">Stock Value</Typography>
          <Typography level="h2">{stockValue}</Typography>
        </CardContent>
        <CardActions>
          <Button variant="soft" size="sm" onClick={removeFromWatchList}>
            Remove from Watchlist
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default StockCard;
