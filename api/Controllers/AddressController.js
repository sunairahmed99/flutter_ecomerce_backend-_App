import Address from "../Models/AddressSchema.js";


const createAddress = async(req,res)=>{

    try{


        const address = await Address.create(req.body);

        return res.status(200).json({

            status:"success",
            data:address
        })

    }catch(err){
        console.log(err)

        return res.status(500).json({

            status:"fail",
            message:"something went wrong try later"
        })
    }
}

const getalladdress = async(req,res)=>{

    try{

        const userid = req.header('userid')

        const address = await Address.find({uid:userid})

        console.log(address);

        return res.status(200).json({

            status:"success",
            data:address
        })

    }catch(err){
        console.log(err)

        return res.status(500).json({

            status:"fail",
            message:"something went wrong try later"
        })
    }
}

const deleteaddress = async(req,res)=>{

    try{

        const adid = req.header('addid'); 
        await Address.findByIdAndDelete(adid);

        console.log('deleted')

        return res.status(200).json({

            status:"success",
            data:'deleted successfully'
        })

        
    }catch(err){
        console.log(err)

        return res.status(500).json({

            status:"fail",
            message:"something went wrong try later"
        })
    }
}

export{createAddress,getalladdress,deleteaddress}