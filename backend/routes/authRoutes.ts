import { Router } from 'express';
import { login, register } from '../authController';
import { verifyToken } from '../verifyLogin';
import { authenticate } from '../authMiddleware';
const router = Router();
router.post("/",authenticate,verifyToken)
router.post('/login', login);
router.post('/register', register);

export default router;
