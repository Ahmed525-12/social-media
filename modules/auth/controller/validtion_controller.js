import{userModel} from "../../../model/user_model.js"
import bcrypt from 'bcryptjs'
import jwt from'jsonwebtoken'
import { myEmail } from "../../../services/email.js"
import { nanoid } from 'nanoid'



export const signup =async (req,res)=>{
const{email,fName,password,phone,role}=req.body
const user =await userModel.findOne({email}).select('email')

try {
    if (user) {
        res.json({massage:"email exsist", })
    } else {
        const hashPassword= await bcrypt.hash(password,parseInt(process.env.SaltRound))
        const newUser= new userModel({email,fName,password:hashPassword,phone,role})
        const savedUser=await newUser.save()
        const token =jwt.sign({id:savedUser._id},process.env.emailToken,{expiresIn:60*60*60})
        const rfToken = jwt.sign({ id: savedUser._id }, process.env.emailToken,)
        const link = `${req.protocol}://${req.headers.host}${process.env.BASEURL}/auth/confrimEmail/${token}`
        const linkrf =
        `${req.protocol}://${req.headers.host}${process.env.BASEURL}/auth/refToken/${rfToken}`
        myEmail(email,"confrim Email",`<a href='${link}'> confrim </a><br>   <a href='${linkrf}'>Re-send confirmation email</a>`)
        savedUser?res.json({massage:"done",token}):res.json({massage :"failed"})
    }
} catch (error) {
    res.json({massage:"error",error})
    console.log({error});
}
}




export const confrimEmail=async (req,res)=>{
try {
    const {token}=req.params
    if (!token) {
        res.json({massage :"failed token"})
    } else {
        const decoded = jwt.verify(token,process.env.emailToken)
        if (!decoded?.id) {
            res.json({massage :"failed"})
        } else {
            const user = await userModel.updateOne({

                _id:decoded.id,
                confirmEmail:false
            },
            

            {  confirmEmail:true}
            )

            user.modifiedCount? res.json({massage :"done"}): res.json({massage :"already"})
        }
    }
} catch (error) {
    res.json({massage :"err",error})
}
}


export const refreshEmail = async (req, res) => {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.emailToken)
    if (!decoded?.id) {
        res.json({ message: "in-valid token payload" })
    } else {
        const user = await userModel.findById(decoded.id).select('email confirmEmail')
        if (!user) {
            res.json({ message: "not register account" })
        } else {
            if (user.confirmEmail) {
                res.json({ message: "Already confirmed" })
            } else {
                const token = jwt.sign({ id: user._id }, process.env.emailToken,
                    { expiresIn: 60 * 5 })
                const link =
                    `${req.protocol}://${req.headers.host}${process.env.BASEURL}/auth/confirmEmail/${token}`

                myEmail(user.email,
                    'ConfirmationEmail',
                    `<a href='${link}'>Follow me to confirm u account</a> `)
                res.json({ message: "Done" })
            }
        }
    }

}

export const sigin = async(req,res)=>{

const{email,password}=req.body
const user =  await userModel.findOne({email})
if (!user) {
    res.json({massage :"in valid account"})
} else {
   if (user.confirmEmail&&user.isDeleted==false&&user.blocked==false) {
    const match =await bcrypt.compare(password,user.password)
    if (!match) {
        res.json({massage :"failed password"})
    } else {
        const token =jwt.sign({id:user._id,isLoggedIn:true},
            process.env.loginToken,{expiresIn:60*60*60},

            )
            await userModel.updateOne({_id:user.id},{online:true})
            res.json({massage :"done", token})
    }
   } else {
    res.json({massage :"your email not confirm"})
   }
}


}
export const sendcode=async (req,res )=>{
    const {email}=req.body
 const user = await userModel.findOne({email}).select("email")
 if (!user) {
    res.json({massage:"the account not found"})

 } else {
    // const code = Math.floor(Math.random()*(9999-1000+1)+1000)
    const code = nanoid()
    myEmail(email,"Forget Password",`<h1>Access code : ${code}</h1>`)
   const updateuser= await userModel.updateOne({_id:user._id},{code})
   updateuser?  res.json({massage:"done"}):  res.json({massage:"fail"})


 }
}
export const forgetPassword=async(req,res)=>{
    const {code,email,newPassword}=req.body
if (code==null) {
    res.json({massage:"in valid code"})
} else {
    const newHAsh=await bcrypt.hash(newPassword,parseInt(process.env.SaltRound))
    const user = await userModel.updateOne({code,email},{password:newHAsh,code:null})
    user.modifiedCount?  res.json({massage:"done"}):  res.json({massage:"fail"})
}

}