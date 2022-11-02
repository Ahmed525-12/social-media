import { commentModel } from "../../../model/comment_model.js";
import { userModel } from "../../../model/user_model.js";
import Cryptr from'cryptr';
const cryptr = new Cryptr("process.env.encryptScretKey");
export const addComment= async (req,res)=>{
    try {
       const { createdBy,productId } = req.params;
       const {commentBody}=req.body
       const user = await userModel.findById(createdBy)
   
       if (!user&&user.isDeleted==true) {
       res.json({message:"you cant add comment"})
   
   }else{
   const addcomment= new commentModel({commentBody,createdBy,productId})
   const savecomment=await addcomment.save()
   res.json({massage:"done added",savecomment})
   }
    } catch (error) {
       res.json({massage:"error",error})
   console.log(error);
    }
   }


   export const updateComment= async (req,res)=>{
    try {
       const user = await userModel.findById(req.user._id)
       const {commentBody}=req.body
   
   if (!user) {
       res.json({massage:"ucant update"})
   
   } else {
       const updateComment= await productModel.updateMany({ _id: user._id },{
        commentBody       })
        updateComment.modifiedCount ? res.json({ message: "Done" },updateComment) 
       : res.json({ message: "Fail in update Password" })
   }
    } catch (error) {
       res.json({massage:"error",error})
       console.log(error);
    }
   }


   export const softDeleteUser = async (req, res) => {
    const { id } = req.params;
    const user = await userModel.findById(req.user._id)

    const comment = await commentModel.updateOne({ _id: id},
        { isDeleted: true,
            deletedBy:user.fName
        })
        comment.modifiedCount ? res.json({ message: "Done" }) :
        res.json({ message: "In-valid message or u not auth" })
  }

  export const users = async (req, res) => {
    try {
        const user = await userModel.findById(req.user._id)
const phone = user.phone
const decryptedPhone = cryptr.decrypt(phone);
        const usersList = await commentModel.find({}).populate(
            {
                path: 'createdBy',
                select: `fName ${decryptedPhone}`,
                path:"productId"
                ,select:"title"
            }
        )
        res.json({ message: "user Module", usersList })
    } catch (error) {
        res.json({ message: "catch error" , error })
        
    }
 
}