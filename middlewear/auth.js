import jwt from'jsonwebtoken'

import { userModel } from '../model/user_model.js'

export const auth = () => {
    return async (req, res, next) => {
       try {
        const {authorization}=req.headers
        if (!authorization) {
            res.json({massage:"fail key"})
        } else {
            const token = authorization
            const decoded = jwt.verify(token, process.env.loginToken)
            if (!decoded?.id) {
                res.json({ message: "In-valid  token payLoad" })

            } else {
                const user = await userModel.findById(decoded.id).select("fName email")
                if (!user) {
                    res.json({ message: "In-valid  token user" })
                } else {
                    req.user = user
                    next()
                }
            }
        }
       } catch (error) {
        res.json({ message: "Catch error"})
       }
    }
}