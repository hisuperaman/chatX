import express from "express";

import { signup, checkUsername, login } from '../controllers/auth-controller.js';

// router arranges group of routes together and help in modularizing routes
const router = express.Router();


router.post('/checkusername', checkUsername);

router.post('/signup', signup);
router.post('/login', login);


export default router;