import jwt from 'jsonwebtoken';

const verifieduser = async(req,res,next)=>{

    try{

        const token = req.header('auth-token');

        if(!token){

            return res.status(400).json({
                status:"fail",
                message:"token is empty"
            })
        };

        let verifytoken = jwt.verify(token,process.env.jwt_key);

        if(!verifytoken){

            return res.status(400).json({

                status:"fail",
                message:'please login again token expire'
            })
        }

        let id = verifytoken.id;

        req.id = id;

        next();


    }catch(err){
        console.log(err)

        return res.status(500).json({

            status:"fail",
            message:"something went wrong",
        })
    }
}

export default verifieduser;