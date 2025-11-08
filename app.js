import express from 'express';
import cors from 'cors';
import userRouter from './api/Routes/UserRouter.js';
import Authrouter from './api/Routes/AuthRouter.js';


const app = express();
app.use(cors());

// ⚠️ JSON parser ko exclude karo /payment/webhook se
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




export default app;
