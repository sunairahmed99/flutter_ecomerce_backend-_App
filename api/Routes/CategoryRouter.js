import express from 'express';
import { createcategory, getallcategory } from '../Controllers/CategoryController.js';


const categoryRouter = express.Router();


categoryRouter.post('/create',createcategory);
categoryRouter.get('/get',getallcategory);

export default categoryRouter;