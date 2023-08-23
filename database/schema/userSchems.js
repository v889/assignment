import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
        name:{
            type:String,
            require:true
        },
        phoneNumber:{
            type:Number,
            require:true,
            unique:true
        },
        password:{
            type:String,
            require:true
        },
    }
)
export const Users=new mongoose.model("USER",userSchema);
