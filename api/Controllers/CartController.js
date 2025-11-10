import Cart from "../Models/CartSchema.js";


const createCart = async(req,res)=>{

    try{

    
        const cart = await Cart.create(req.body)

        console.log(cart)


        return res.status(200).json({

            status:"success",
            data:cart
        })


    }catch(err){

        return res.status(500).json({

            status:"fail",
            message:"something went wrong try later"
        })
    }
}

const getallCart = async(req,res)=>{

    try{

        const uid = req.header('userid');

        console.log(uid)

        

        const cart = await Cart.find({uid:uid}).populate('pid');


        return res.status(200).json({

            status:"success",
            data:cart
        })


    }catch(err){
        console.log(err)

        return res.status(500).json({

            status:"fail",
            message:"something went wrong try later"
        })
    }
}

const updatecart = async(req,res)=>{
    try{

        const cartid = req.header('cartid');
        const userid = req.header('userid');
        const qty = req.header('qty');

        console.log(qty)

       
      const cartdata = await Cart.findOneAndUpdate(
            { _id: cartid, uid: userid },
            { $set: { qty } },
            { new: true, runValidators: true }
            );

        return res.status(200).json({
            status:"success",
            data:cartdata
        })    


    }catch(err){

        return res.status(500).json({
            status:"fail",
            message:"something went wrong"
        })
    }

}


const deletecartitem = async(req,res)=>{
    try{

     
        const userid = req.header('userid');
        console.log('userrrrid')

        console.log(userid)

       await Cart.deleteMany({ uid: userid });


        return res.status(200).json({
            status:"success",
            data:"deleted successfully"
        })
        


    }catch(err){
        console.log(err)

        return res.status(500).json({
            status:"fail",
            message:"something went wrong"
        })
    }

}

const cartalldelete = async(req,res)=>{

    try{

        console.log('hai')


        const cart = await Cart.deleteMany();

        console.log(cart)


        return res.status(200).json({

            status:"success",
            data:cart
        })


    }catch(err){

        return res.status(500).json({

            status:"fail",
            message:"something went wrong try later"
        })
    }
}

export{createCart,getallCart,updatecart,deletecartitem,cartalldelete}