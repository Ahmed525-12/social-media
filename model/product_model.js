import { Schema, model } from "mongoose";
const productSchema= new Schema({
    title:{type:String},
    desc:{type:String},
    price:{type:Number},
    likes :[ {
        type: [Schema.Types.ObjectId], // HERE
        ref: 'User',

}],
comments :[{  type: [Schema.Types.ObjectId], // HERE
ref: 'Comment',

}],
createdBy :{
    type: Types.ObjectId, ref: 'User', required: true 
},
isDeleted:false,

}, {
    timestamps: true,
 
})

export const userModel = model('Product', userSchema)