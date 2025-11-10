import express from 'express';
import { cartalldelete, createCart, deletecartitem, getallCart, updatecart } from '../Controllers/CartController.js';


const CartRouter = express.Router();




CartRouter.post('/create',createCart)
CartRouter.get('/getall',getallCart)
CartRouter.patch('/update',updatecart)
CartRouter.delete('/delete',deletecartitem)
CartRouter.delete('/delete/all',cartalldelete)


export default CartRouter;