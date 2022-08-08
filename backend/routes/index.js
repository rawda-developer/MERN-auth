import express from 'express';
const router = express.Router();
import { login, logout, isLoggedIn, isLoggedOut } from './authRoutes';
import { register } from './auth/registeration';
router.post('/login', login);
router.post('/register', register);
router.post('/logout', logout);
router.get('/isLoggedIn', isLoggedIn);
router.get('/isLoggedOut', isLoggedOut);

export default router;
