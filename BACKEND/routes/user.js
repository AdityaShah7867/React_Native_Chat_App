import express from 'express';
import { register, login, getUsers } from '../controllers/auth.js';
import validateToken from '../middlewares/isLoggedIn.js';

const userRouter = express.Router();


userRouter.route('/register').post(register);
userRouter.route('/login').post(login);
userRouter.route('/').get(validateToken,getUsers);

export default userRouter;