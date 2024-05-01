import express from 'express';
import { sendOTP, verifyOTP } from '../controllers/otp-controller.js';

const router = express.Router();

router.post('/sendotp', sendOTP)
router.post('/verifyotp', verifyOTP);

export default router;