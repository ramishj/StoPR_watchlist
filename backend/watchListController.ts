import { Request, Response } from 'express';
import User from './models/User'; // Assuming your User model is in a file called User.ts

export const getWatchlists = async (req: Request, res: Response) => {
  try {
    // Get user ID from request (assuming it's stored in req.user)
    const userId = req.body.user.userId;

    // Find user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return user's watchlists
    return res.status(200).json({ watchlists: user.watchlist[0].symbols });
  } catch (error) {
    console.error('Error fetching watchlists:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const addToWatchlist = async (req: Request, res: Response) => {
  try {
    // Get user ID from request (assuming it's stored in req.user)
    const userId = req.body.user.userId;

    // Get watchlist name and symbol to add from request body
    const { symbol } = req.body;

    // Find user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the watchlist with the given name already exists
    const existingWatchlist = user.watchlist.find(watchlist => watchlist.name === "default");

    if (existingWatchlist) {
      // Add symbol to existing watchlist
      existingWatchlist.symbols.push(symbol);
    } else {
      // Create a new watchlist
      user.watchlist.push({ name:"default", symbols: [symbol] });
    }

    // Save the updated user
    await user.save();

    return res.status(200).json({ message: 'Symbol added to watchlist', watchlists: user.watchlist[0].symbols });
  } catch (error) {
    console.error('Error adding to watchlist:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const removeFromWatchlist = async (req: Request, res: Response) => {
  try {
    // Get user ID from request (assuming it's stored in req.user)
    const userId = req.body.user.userId;

    // Get watchlist name, symbol, and action from request body
    const { symbol } = req.body;

    // Find user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the watchlist by name
    const watchlist = user.watchlist.find(watchlist => watchlist.name === "default");

    if (!watchlist) {
      return res.status(404).json({ message: 'Watchlist not found' });
    }

    watchlist.symbols = watchlist.symbols.filter(s => s !== symbol);

    // Save the updated user
    await user.save();

    return res.status(200).json({ message: 'Action performed successfully', watchlists: user.watchlist });
  } catch (error) {
    console.error('Error removing from watchlist:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
export const module={
  getWatchlists,
  addToWatchlist,
  removeFromWatchlist
}