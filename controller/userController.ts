import expressAsyncHandler from "express-async-handler";
import { PrismaClient } from "@prisma/client";
import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import ApiError from "../utils/ApiError";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
const prisma = new PrismaClient()
const Users = prisma.user

const signUp = expressAsyncHandler(async (req:Request, res:Response, next:NextFunction) => {
    const { email, name, password  } = req.body;
    const hashedPassword:string = await hash(password,12)
        const user = await Users.create({
            data: {
                email,
                name,
                password:hashedPassword,
            },
        });
        // const token : string = sign({id:user.id ,email: user.email},`${process.env.JWT_SECRET_KEY}`,{expiresIn:`${process.env.EXPIRATION_TIME}`} ) ;
        res.status(StatusCodes.CREATED).json({ message : "user created successfully" });
});

const login = expressAsyncHandler(async (req:Request, res:Response, next:NextFunction) => {
    const { email, password } = req.body;
    const user = await Users.findUnique({where:{email}})
    if (!user) {
        return next(new ApiError("Error in email or password",404))
    }
    const isMatch = await compare(password, user?.password as string);
    if (!isMatch) {
        return next(new ApiError("Error in email or password",404))
    }
    const token : string = sign({id:user?.id , email: user?.email},`${process.env.JWT_SECRET_KEY}`,{expiresIn:`${process.env.EXPIRATION_TIME}`} ) ;

    res.status(StatusCodes.OK).json({ message : "user logged in successfully" , token });

});


export { signUp , login };