import express from 'express';
import {
    register,
    login,
    logout,
    sendVerifyOtp,
    verifyEmail,
    sendResetOtp,
    resetPassword,
    isAuthenticated,
} from '../controller/authController.js';
import adminAuth from '../middleware/adminAuth.js';

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/send-reset-otp', sendResetOtp);
authRouter.post('/reset-password', resetPassword);

authRouter.post('/send-verify-otp', adminAuth, sendVerifyOtp);
authRouter.post('/verify-account', adminAuth, verifyEmail);
authRouter.get('/is-auth', adminAuth, isAuthenticated);

export default authRouter;
