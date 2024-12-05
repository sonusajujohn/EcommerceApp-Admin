const express= require('express');
import { loginUser, registerUser } from '../controllers/adminController';



const userRouter=express.Router();

userRouter.post('/register',registerUser);
userRouter.post('/login',loginUser);

export default userRouter;