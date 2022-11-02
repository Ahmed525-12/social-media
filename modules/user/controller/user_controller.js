import { userModel } from "../../../model/user_model.js"
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
export const findUserById=async(req,res)=>{
  const{id}=req.params
  const foundUser= await userModel.findById({_id:id})
  foundUser? res.json({massage:"done",foundUser}):res.json({massage:"not found"})
}


export const softDeleteUser = async (req, res) => {
  const { id } = req.params;
 
  const user = await userModel.updateOne({ _id: id},
      { isDeleted: true })
  user.modifiedCount ? res.json({ message: "Done" }) :
      res.json({ message: "In-valid message or u not auth" })
}

export const updateProfile= async (req,res)=>{
try {
  const {id}=req.params
  const {fName,gender,role}=req.body
  const updateProfile= await userModel.updateMany({_id:id},{
    fName,gender,role
  })

  updateProfile.modifiedCount ? res.json({ message: "Done" }) 
  : res.json({ message: "Fail in update profile" })
} catch (error) {
  res.json({ message: "error",error })
  console.log(error);
}
}