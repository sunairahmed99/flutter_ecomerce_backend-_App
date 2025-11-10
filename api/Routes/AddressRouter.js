import express from 'express';
import { createAddress, deleteaddress, getalladdress } from '../Controllers/AddressController.js';


const AddressRouter = express.Router();

AddressRouter.post('/create',createAddress);
AddressRouter.get('/get',getalladdress);
AddressRouter.get('/delete',deleteaddress);

export default AddressRouter