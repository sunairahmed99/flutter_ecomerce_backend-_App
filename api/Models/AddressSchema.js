import mongoose from 'mongoose';

const AddressSchema = mongoose.Schema({

    uid:{

        type:mongoose.Schema.Types.ObjectId,
        ref:'Userss',
    },
    
    name:{

        type:String,
        required:[true, 'name required']
    },
    phone:{
        type:String,
        required:[true, 'number required']
    },
    address:{
        type:String,
        required:[true, 'address required']
    },
    city:{
        type:String,
        required:[true, 'city required']
    },
    state:{
        type:String,
        required:[true, 'state required']
    },
    country:{
        type:String,
        required:[true, 'country required']
    }
})

const Address = mongoose.model('Address',AddressSchema);

export default Address