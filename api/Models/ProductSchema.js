import mongoose from 'mongoose';


const productSchema = mongoose.Schema({

    pname:{

        type:String,
        required:[true, 'pname required']
    },
    pdescription:{
        type:String,
        required:[true, 'product description required']
    },
    pprice:{
        type:Number,
        required:[true, 'product price required']
    },
    pdiscount:{
        type:Number,
    },
    pdisprice:{
        type:Number,
    },
    ptype:{
        type:mongoose.Schema.ObjectId,
        ref:'Category'
    },
    pimage:{
        type:[String],
        required:[true, 'product image required']
    },
    psize:{
        type:[String],
    },
    pcolor:{
        type:[String]
    }
})

const Product = mongoose.model('Product',productSchema)

export default Product