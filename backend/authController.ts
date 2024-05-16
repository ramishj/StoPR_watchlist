import { Request, Response } from 'express';
import { z } from 'zod';
import User from './models/User';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './jwtAuth';
import bcrypt from 'bcrypt';

// Define Zod schemas for input validation
const loginSchema = z.object({
  username: z.string(),
  password: z.string()
});

const registerSchema = z.object({
  firstName: z.string(),
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  mobileNumber: z.string().min(10).max(10),
  country: z.string()
});

export const login = async (req: Request, res: Response) => {
  try {
    // Validate request body against login schema
    const { username, password } = loginSchema.parse(req.body);

    // Check if all fields are provided
    if (!username || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1d' });

    // Return user data or authentication token
    res.status(200).json({ user, token });
  } catch (error) {
    console.error('Login error:', error);
    if (error instanceof z.ZodError) {
      // Handle validation error
      res.status(400).json({ message: 'Invalid input', details: error.errors });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    // Validate request body against register schema
    const { firstName, username, email, password, mobileNumber, country } = registerSchema.parse(req.body);

    // Check if all fields are provided
    if (!firstName || !username || !email || !password || !mobileNumber || !country) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if the username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the saltRounds

    // Create new user with hashed password and default watchlist
    const newUser = new User({
      firstName,
      username,
      email,
      password: hashedPassword, // Save hashed password
      mobileNumber,
      country,
      watchlist: [{ name: 'default', symbols: [] }] // Add default watchlist
    });

    // Save user to the database
    await newUser.save();

    // Return success response
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    if (error instanceof z.ZodError) {
      // Handle validation error
      res.status(400).json({ message: 'Invalid input', details: error.errors });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};
