import { Router } from "express";
import * as Rc  from './controller/product_controller.js'


const router = Router()


router.post("/addProduct",Rc.addProduct)
router.put("/updateProduct",Rc.updateProduct)
router.delete("/deleteProudct/:id",Rc.deleteProduct)
router.get('/foundProudctId/:id',Rc.findProductById)
router.patch('/softDelete',Rc.softDeleteProduct)
router.get('/foundProudctTitle',Rc.findProductByTitle)



export default router