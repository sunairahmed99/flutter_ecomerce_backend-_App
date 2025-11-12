import express from 'express';
import cors from 'cors';
import userRouter from './api/Routes/UserRouter.js';
import Authrouter from './api/Routes/AuthRouter.js';
import productRouter from './api/Routes/productRouter.js';
import CartRouter from './api/Routes/CartRouter.js';
import categoryRouter from './api/Routes/CategoryRouter.js';
import AddressRouter from './api/Routes/AddressRouter.js';
import OrderRouter from './api/Routes/OrderRouter.js';
import FavoriteRouter from './api/Routes/FavoriteRouter.js';
import StripeRouter from './api/Routes/StripeRouter.js';





const app = express();
app.use(cors());

app.use((req, res, next) => {
  if (req.originalUrl === "/payment/webhook") {
    next(); // skip json parsing
  } else {
    express.json()(req, res, next);
  }
});

// ✅ Routes
app.use('/user', userRouter);
app.use('/auth', Authrouter);
app.use('/category', categoryRouter);
app.use('/product', productRouter);
app.use('/cart', CartRouter);
app.use('/address', AddressRouter);
app.use('/order', OrderRouter);
app.use('/favorite', FavoriteRouter);
app.use('/payment', StripeRouter);












export default app;
