import { Schema, model } from "mongoose";
import encrypt from 'mongoose-encryption'

const userSchema= new Schema ({
    fName: { type: String },
    lame: { type: String },
    address: { type: String },
    email: { type: String, required: true, unique: true },
    phone: { type: Number },
    age: { type: Number},
    gender: { type: String, enum: ['Male', 'Female'], default: "Male" },
    confirmEmail: { type: Boolean, default: false },
    password: { type: String, required: true },
    isDeleted:false,
    online: { type: Boolean, default: false },
    blocked: { type: Boolean, default: false },
    code:{type:String,default:null},
    role:{type:String,enum: ['user', 'admin'], default: "user"}
}, {
    timestamps: true,
 
})


export const userModel = model('User', userSchema)