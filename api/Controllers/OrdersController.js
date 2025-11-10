import Orders from "../Models/OrderSchema.js";



const createOrder = async(req,res)=>{

    try{


        const order = await Orders.create(req.body)

        console.log(order)


        return res.status(200).json({

            status:"success",
            data:order
        })


    }catch(err){

        return res.status(500).json({

            status:"fail",
            message:"something went wrong try later"
        })
    }
}

const orderdeleteall = async(req,res)=>{

    try{


        const order = await Orders.deleteMany()

        console.log(order)


        return res.status(200).json({

            status:"success",
            data:order
        })


    }catch(err){

        return res.status(500).json({

            status:"fail",
            message:"something went wrong try later"
        })
    }
}



export{createOrder,orderdeleteall}