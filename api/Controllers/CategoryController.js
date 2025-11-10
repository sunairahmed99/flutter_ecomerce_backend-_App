import Category from "../Models/CategorySchema.js";


const createcategory = async(req,res)=>{

    try{


        const category = await Category.create(req.body);

        return res.status(200).json({

            status:"success",
            data:category
        })

    }catch(err){

        return res.status(500).json({

            status:"fail",
            message:"something went wrong try later"
        })
    }
}

const getallcategory = async(req,res)=>{

    try{


        const category = await Category.find()

        return res.status(200).json({

            status:"success",
            data:category
        })

    }catch(err){

        return res.status(500).json({

            status:"fail",
            message:"something went wrong try later"
        })
    }
}

export{createcategory,getallcategory}