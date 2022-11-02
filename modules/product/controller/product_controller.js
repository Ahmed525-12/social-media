import { productModel } from "../../../model/product_model.js";
import { userModel } from "../../../model/user_model.js";

export const addProduct= async (req,res)=>{
 try {
    const { createdBy } = req.params;
    const {price,desc,title}=req.body
    const user = await userModel.findById(createdBy)

    if (!user&&user.isDeleted==true&&user.blocked==true) {
    res.json({message:"you cant add product"})

}else{
const addProduct= new productModel({price,desc,title,createdBy})
const saveProduct=await addProduct.save()
res.json({massage:"done added",saveProduct})
}
 } catch (error) {
    res.json({massage:"error",error})
console.log(error);
 }
}

export const updateProduct= async (req,res)=>{
 try {
    const user = await userModel.findById(req.user._id)
    const {price,desc,title}=req.body

if (!user) {
    res.json({massage:"ucant update"})

} else {
    const updateUser= await productModel.updateMany({ _id: user._id },{
        price,desc,title
    })
    updateUser.modifiedCount ? res.json({ message: "Done" }) 
    : res.json({ message: "Fail in update Password" })
}
 } catch (error) {
    res.json({massage:"error",error})
    console.log(error);
 }
}


export const deleteProduct= async (req,res)=>{
    const{id}=req.params
    const user = await userModel.findById(reciverId)

   
    if (!user) {
        res.json({massage:"ucant delete this product"})
    } else {
        const deleteProduct= await productModel.deleteOne({_id:id})
        res.json({massage:"done",deleteProduct})
    }
}


export const findProductById=async(req,res)=>{
    const{id}=req.params
    const foundproduct= await productModel.findById({_id:id})
    foundproduct? res.json({massage:"done",foundproduct}):res.json({massage:"not found"})
  }

  
export const softDeleteProduct = async (req, res) => {
    const { id } = req.params;
   
    const product = await productModel.updateOne({ _id: id},
        { isDeleted: true })
        product.modifiedCount ? res.json({ message: "Done" }) :
        res.json({ message: "In-valid message or u not auth" })
  }

  export const findProductByTitle=async(req,res)=>{
    const{title}=req.params
    const foundproduct= await productModel.findById({title})
    foundproduct? res.json({massage:"done",foundproduct}):res.json({massage:"not found"})
  }
 