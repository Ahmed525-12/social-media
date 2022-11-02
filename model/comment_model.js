import { Schema, model,Types } from "mongoose";
const commentSchema= new Schema({
    commentBody:{
        type:String
    },
    createdBy:{
        type: Types.ObjectId, ref: 'User', required: true 
    } ,
    productId :{
        type: Types.ObjectId, ref: 'Product', required: true 

    },
    isDeleted:{ type: Boolean, default: false },
    deletedBy:{  type: Types.ObjectId, ref: 'User', required: true }
}, {
    timestamps: true,
 
})

export const commentModel = model('Comment', commentSchema)