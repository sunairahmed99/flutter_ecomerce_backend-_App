import express from 'express';
import {googleLogin } from '../Controllers/Authcontroller.js';

const Authrouter = express.Router();



Authrouter.post('/google', googleLogin);


export default Authrouter;
