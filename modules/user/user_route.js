import { Router } from "express";
import * as uc from './controller/user_controller.js'
import { auth } from "../../middlewear/auth.js";
import { validation } from "../../middlewear/validtion.js";
import * as validators from './validtion/user_validtion.js'

const router = Router()





router.patch('/updatepassword', auth(), uc.updatePassword)
router.get('/foundUserId/:id',uc.findUserById)
router.patch('/softDelete',uc.softDeleteUser)
router.put('/updateProfile',auth(),uc.softDeleteUser)

export default router