import { PrismaClient, Products, User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
const prisma = new PrismaClient()
const Products = prisma.products

const getMe = expressAsyncHandler(async (req:Request, res:Response, next:NextFunction) => {
    let {
        email,
        name,
        createdAt,
        id,
        // products
    }  = req.user
    
    let products : Products[] = []
    products = await Products.findMany({
        where:{
            authorId:id,
            published:true
        }
    })
    res.json({
        user:{
            id,
            email,
            name,
            createdAt,
            products
        }
    });
})


export { getMe };