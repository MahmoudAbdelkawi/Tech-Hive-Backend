import { loginValidation, signupValidation } from "../utils/validation/authValidation";
import validResult from "../middlewares/validationResult";
import { login, signUp } from "../controller/userController";
import { Router } from "express";
import { protect } from "../middlewares/protect";

var router = Router();

/* GET users listing. */
router.post('/signup', signupValidation , validResult ,signUp );
router.post('/login', loginValidation , validResult ,login );
// don't forget update image

export default router;
