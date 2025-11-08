import app from "./app.js";
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({quiet:true})


mongoose.set({strictQuery:true});



try{

    mongoose.connect(process.env.DATABASE)
    console.log("connected")


}catch(err){

    console.log(err);
    console.log("not connected")
}

const port = process.env.PORT || 9000

app.listen(port,()=>{

    console.log(`port is running ${port}`)
})

