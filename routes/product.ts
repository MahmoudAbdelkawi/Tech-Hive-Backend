import { Router } from "express";
import { protect } from "../middlewares/protect";
import { addProduct, deleteProduct, getAllProduct, searchOnProduct, updateProduct } from "../controller/productController";
import validResult from "../middlewares/validationResult";
import { productValidation } from "../utils/validation/productValidation";

var router = Router();

router.post('/addProduct', protect ,productValidation , validResult , addProduct);
router.delete('/deleteProduct/:productId', protect  , deleteProduct);
router.patch('/updateProduct/:productId', protect  , updateProduct);
router.get('/searchOnProduct/', protect , searchOnProduct);
router.get('/getAllProduct/', protect , getAllProduct);

export default router;
