import mongoose from "mongoose";

let isConnected = false

export const connectToDB = async ()=>{
    mongoose.set('strictQuery', true);

    if(isConnected){
        console.log('connected to database successful');
        return
    }

    try{
        await mongoose.connect(process.env.MONGODB_URL, {
            bdName: "share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true, 
        })
        isConnected = true;
        console.log('connected to database successful');
    }catch(error){
        console.log(error)
    }
}