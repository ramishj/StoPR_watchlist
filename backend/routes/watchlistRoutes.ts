import { Router, Request, Response } from 'express';
import { getWatchlists, addToWatchlist, removeFromWatchlist } from '../watchListController';
import { authenticate } from '../authMiddleware'; // Import your authentication middleware
import { searchSymbols } from '../services/alphaVantageService';

const router = Router();

// Apply authentication middleware to routes where user authentication is required
router.get('/', authenticate, getWatchlists);
router.post('/add', authenticate, addToWatchlist);
router.delete('/remove', authenticate, removeFromWatchlist);

router.get('/searchSymbol', async (req: Request, res: Response) => {
  const { symbol } = req.query; // Access the query parameter
  try {
    const data = await searchSymbols(symbol as string);

    // Extract and return the symbols and names
    const results = data.bestMatches.map((match: any) => ({
      symbol: match["1. symbol"],
      name: match["2. name"]
    }));
    
    res.json({ results });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
