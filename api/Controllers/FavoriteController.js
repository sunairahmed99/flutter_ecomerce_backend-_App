import Favorite from "../Models/FavoriteSchema.js"


const FavoriteCreate = async(req,res)=>{

    try{

        const favorite = await Favorite.create(req.body)

        return res.status(200).json({

            status:"success",
            data:favorite
        })


    }catch(err){

        return res.status(500).json({

            status:"fail",
            message:"something went wrong try later"
        })
    }
}

const getallfavorite = async(req,res)=>{

    try{

        const uid = req.header('userid');
        


        const favorite = await Favorite.find({uid:uid}).populate('pid');


        return res.status(200).json({

            status:"success",
            data:favorite
        })


    }catch(err){
        
        return res.status(500).json({

            status:"fail",
            message:"something went wrong try later"
        })
    }
}




const deletefavoriteitem = async(req,res)=>{
    try{

     
        const userid = req.header('userid');
        const proid = req.header('proid');

        console.log(userid)
        console.log(proid)

        const fav = await Favorite.findOneAndDelete({ uid: userid,pid:proid});

       console.log('deletedd')
       console.log(fav)


        return res.status(200).json({
            status:"success",
            data:"deleted successfully"
        })
        


    }catch(err){

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

export{FavoriteCreate,getallfavorite,deletefavoriteitem}