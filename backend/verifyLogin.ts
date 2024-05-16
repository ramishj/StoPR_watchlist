import { Request, Response } from 'express';

// Define a custom interface that extends the express Request interface
interface CustomRequest extends Request {
    user?: any; // Define the 'user' property and its type
}

// Middleware to verify token and return true or false
export const verifyToken = (req: CustomRequest, res: Response) => {
    // If user is set in request (by authenticate middleware), the token is valid
    if (req.body.user) {
        return res.json({ valid: true });
    }
    // Otherwise, the token is invalid
    return res.json({ valid: false });
};
