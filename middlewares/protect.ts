import { NextFunction, Request, Response } from "express"
import expressAsyncHandler from "express-async-handler"
import ApiError from './../utils/ApiError';
import { StatusCodes } from "http-status-codes";
import { verify } from "jsonwebtoken";
import { DecodedToken } from "../types";
import { PrismaClient, User } from "@prisma/client";
const prisma = new PrismaClient()
const Users = prisma.user

const protect = expressAsyncHandler(async function(req:Request,res:Response,next:NextFunction){
    if (req.headers.authorization || req.body.token) {
        let token = req.headers.authorization?.toString().split(" ")[1] || req.body.token
        if (token == "null") {
            token = req.body.token
        }
        const decode : DecodedToken|any = verify(String(token),`${process.env.JWT_SECRET_KEY}`) 
        const user:User | any = await Users.findUnique({
            where:{id: decode.id}
        })
        req.user = user
        next()  
    }
    else return next(new ApiError("You're not logged In", StatusCodes.BAD_REQUEST))
    
})


export {protect}