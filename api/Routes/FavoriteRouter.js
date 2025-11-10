import express from 'express';
import { deletefavoriteitem, FavoriteCreate, getallfavorite } from '../Controllers/FavoriteController.js';

const FavoriteRouter = express.Router();



FavoriteRouter.post('/create',FavoriteCreate)
FavoriteRouter.get('/getall',getallfavorite)
FavoriteRouter.delete('/delete',deletefavoriteitem)


export default FavoriteRouter;