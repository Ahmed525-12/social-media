import { Schema, model ,Types} from "mongoose";
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
isDeleted:{ type: Boolean, default: false },


}, {
    timestamps: true,
 
})

export const productModel = model('Product', productSchema)