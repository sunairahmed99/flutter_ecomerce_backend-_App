import express from 'express';
import { createOrder, orderdeleteall } from '../Controllers/OrdersController.js';

const OrderRouter = express.Router();


OrderRouter.post('/create',createOrder);
OrderRouter.delete('/delete/all',orderdeleteall)


export default OrderRouter;