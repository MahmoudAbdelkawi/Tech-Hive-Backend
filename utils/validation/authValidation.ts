import { check } from "express-validator/src/middlewares/validation-chain-builders";
// import Users from './../models/user';
import ApiError from "../ApiError";
import { StatusCodes } from 'http-status-codes';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
const Users = prisma.user

const signupValidation = [
    check('email').isEmail().withMessage("Email Not Valid").custom(async(email:string)=>{
        const user = await Users.findUnique({where:{email}})
        if (user) {
            return Promise.reject(new ApiError("Email Already used",StatusCodes.NOT_IMPLEMENTED))
        }
        else return true
        
    }),
    check('name').notEmpty().withMessage("name is Required"),
    check('password').isLength({min:8}).withMessage("the password should be more than 8 characters"),
    check('confirmationPassword').custom((confirmationPassword , {req})=>{
        if (confirmationPassword != req.body.password) {
            return Promise.reject(new ApiError("password doesn't match with the password confirmation",StatusCodes.NOT_IMPLEMENTED ))
        }
        return true
        
    }),
]
const loginValidation = [
    check('email').isEmail().withMessage("Email Not Valid"),
    check('password').isLength({min:8}).withMessage("the password should be more than 8 characters"),
]

export {signupValidation,loginValidation}


