import express from 'express';
const router = express.Router();

import { signIn, signUp } from '../controllers/userController.js';

router.post("/signup", signUp);
router.post("/signIn", signIn);





export default router