import { userModel } from "../../../DB/model/user.model.js"
import bcrypt from 'bcryptjs'






export const updatePassword=async(req , res)=>{

try {
  const {oldpassword,newPassword}=req.body
  const user= await userModel.findById(req.user.id)
  const match = await bcrypt.compare(oldpassword,user.password)
  if (!match) {
    res.json({massage:"the password is wrong !!"})
  } else {
    const newHAsh=await bcrypt.hash(newPassword,parseInt(process.env.SaltRound))
    const updatePassword=await userModel.updateOne({_id:user._id},{password:newHAsh})
    updatePassword?  res.json({massage:"done"}):  res.json({massage:"fail"})
  
  
  }
} catch (error) {
  res.json({massage:"error",error})

}

}