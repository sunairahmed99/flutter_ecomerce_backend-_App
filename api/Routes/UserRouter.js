import express from 'express';
import {CreateUsers, verifyUsers, loginUsers, forgotuser, resetpassuser, editprofile, editpassword, verifyuser, emailsendcontroller} from '../Controllers/Usercontroller.js';
import verifieduser from '../Middleware/AuthUser.js';

const userRouter = express.Router();



userRouter.post('/create',CreateUsers);
userRouter.post('/verify',verifyUsers);
userRouter.post('/login',loginUsers);
userRouter.post('/forgot',forgotuser);
userRouter.post('/resetpass',resetpassuser);


//Authenticate User Routes

userRouter.get('/verifyuser',verifieduser,verifyuser);
userRouter.patch('/edit/profile',verifieduser, editprofile);
userRouter.patch('/edit/password',verifieduser,editpassword);
userRouter.get('/orderemail',verifieduser,emailsendcontroller);

export default userRouter