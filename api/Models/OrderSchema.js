import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  uid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Userss', 
    required: true,
  },
  pid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', 
    required: true,
  },
  qty: {
    type: Number,
    default: 1,
  },
  pcolor: {
    type: String,
  },
  psize: {
    type: String,
  },
  total: {
    type: Number,
  },
  addid:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Address'
  },
  ordernumber:{
    type:Number
  },
  createdat:{
    type:Date,
    default:Date.now()
  },
  status:{
    type:String,
    default:"pending"
  },
  paymentstatus:{
    type:String
  }
});

const Orders = mongoose.model('Orders', OrderSchema);

export default Orders;
