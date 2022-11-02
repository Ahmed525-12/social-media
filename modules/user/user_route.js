import { Router } from "express";
import * as uc from './controller/user_controller.js'
import { auth } from "../../middlewear/auth.js";


const router = Router()





router.patch('/updatepassword', auth(), uc.updatePassword)
router.get('/foundUserId/:id',uc.findUserById)
router.patch('/softDelete',uc.softDeleteUser)
router.put('/updateProfile',auth(),uc.updateProfile)
router.put('/blockAccount',auth(),uc.blockAccount)

export default router