import { Router } from "express";
import { validation } from "../../middlewear/validtion.js";
import * as validators from './validtion/auth_validtion.js'
import * as rgister from './controller/validtion_controller.js'
import { auth } from "../../middlewear/auth.js";

const router  = Router()


router.post("/signup",validation(validators.signup) ,rgister.signup)
router.get("/confrimEmail/:token",rgister.confrimEmail)
router.post("/signin",rgister.sigin)
router.patch("/sendCode",rgister.sendcode)
router.patch("/forgetPassword",rgister.forgetPassword)
router.get('/refToken/:token' , rgister.refreshEmail)
router.patch('/signout',auth(),rgister.SignOut)
 

export default router