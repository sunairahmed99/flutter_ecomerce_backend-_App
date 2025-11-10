import mongoose from 'mongoose';

const FavoriteSchema = new mongoose.Schema({
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
});

const Favorite = mongoose.model('Favorite', FavoriteSchema);

export default Favorite;
