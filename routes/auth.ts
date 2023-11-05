import { Router } from "express";
import { protect } from "../middlewares/protect";
import { getMe } from "../controller/authController";

var router = Router();

/* GET users listing. */
router.get('/getMe', protect , getMe);

export default router;
