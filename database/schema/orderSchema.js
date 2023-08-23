import mongoose from "mongoose";
const orderSchema=new mongoose.Schema({
        userId:{
            type:mongoose.Schema.ObjectId,
            ref:"USER",
            require:true
            
        },
        sub_total:{
            type:Number,
            require:true,
        },
        phoneNumber:{
            type:Number,
            require:true
        },
    }
)
export const Orders=new mongoose.model("ORDER",orderSchema);

