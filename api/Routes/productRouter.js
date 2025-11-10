import express from 'express';
import upload from '../Middleware/Multer.js';
import { createproduct, getallproduct, getsingleproduct } from '../Controllers/ProductController.js';



const productRouter = express.Router();



productRouter.post('/create',upload.array('pimage',3),createproduct)
productRouter.get('/get',getallproduct)
productRouter.get('/get/single',getsingleproduct)


export default productRouter;