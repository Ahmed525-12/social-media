import { Router } from "express";
import * as uc from './controller/comment_controller.js'
const router = Router()
router.post("/addComment",uc.addComment)
router.put("/updateComment",uc.updateComment)
router.patch('/softDelete',uc.softDeleteUser)


export default router