import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './jwtAuth';

// Define a custom interface that extends the express Request interface
interface CustomRequest extends Request {
    user?: any; // Define the 'user' property and its type
}

export const authenticate = (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    // Extract token from Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    // If token is not provided, send 401 Unauthorized response
    if (!token) {
      return res.sendStatus(401);
    }

    // Verify the token
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        // If token is invalid, send 403 Forbidden response
        return res.sendStatus(403);
      }
      
      // If token is valid, attach decoded data to request object and call next middleware
      req.body.user = decoded;
      next();
    });
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
