import * as React from 'react';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import { Box, Button, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';
import { ServerLink } from '../ServerLink';

export interface Stock {
  symbol: string;
  name: string;
}

function sleep(duration: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

export default function AsYouTypeSearch({ onAdd }: { onAdd: (symbol: string) => void }) {
  const [loading, setLoading] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const [searchResults, setSearchResults] = React.useState<Stock[]>([]);

  const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);

    // Perform search only if the input value is not empty
    if (value.trim() !== '') {
      setLoading(true);
      try {
        const response = await axios.get(`${ServerLink}/watchlist/searchSymbol`, {
          params: { symbol: value },
        });
        const data: Stock[] = response.data.results;
        setSearchResults(data);

        // Log search results in the console
        console.log('Search results:', data);
      } catch (error) {
        console.error('Error fetching symbol search results:', error);
      } finally {
        setLoading(false);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleAddClick = (symbol: string) => {
    onAdd(symbol);
    setInputValue('');
    setSearchResults([]);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <TextField
        label="Search Symbol"
        value={inputValue}
        onChange={handleInputChange}
        sx={{ mr: 1 }}
      />
      {loading && <CircularProgress size={24} sx={{ mt: 2 }} />}
      <List>
        {searchResults.map((result) => (
          <ListItem key={result.symbol} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <ListItemText primary={result.name} />
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => handleAddClick(result.symbol)}
            >
              Add
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
