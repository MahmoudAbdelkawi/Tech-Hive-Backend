
import { check } from "express-validator";
const productValidation = [
    check('title').notEmpty().withMessage("title is required")
]

export {productValidation}
