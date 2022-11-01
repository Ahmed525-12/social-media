import { Schema, model } from "mongoose";
const commentSchema= new Schema({
    commentbody:{
        type:String
    },
    createdby:{
        type: Types.ObjectId, ref: 'User', required: true 
    } ,
    productId :{
        type: Types.ObjectId, ref: 'Product', required: true 

    },
    isDeleted:false,
    deletedBy:{  type: Types.ObjectId, ref: 'User', required: true }
}, {
    timestamps: true,
 
})

export const userModel = model('Comment', userSchema)