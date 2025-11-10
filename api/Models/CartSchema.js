import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema({
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
});

const Cart = mongoose.model('Cart', CartSchema);

export default Cart;
