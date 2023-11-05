
import express, { NextFunction, Request, Response } from 'express';
import  ApiError  from './utils/ApiError';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import { User } from '@prisma/client';
import usersRouter from './routes/user';
import authRouter from './routes/auth';
import productRouter from './routes/product';
dotenv.config()

var app = express();

// global namespace
declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'images')));
app.use(cors())
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/products', productRouter);
app.get('/', function(req:Request, res:Response, next:NextFunction) {
  res.send('respond with a resource');
});

// catch 404 and forward to error handler
app.use("*",function(req:Request, res:Response, next:NextFunction) {
  return next(new ApiError("Page not found" , 404));
});

// error handler
app.use(function(err:ApiError, req:Request, res:Response, next:NextFunction) {
    res.status(err.statusCode || 500).send({
        message: err.message || "Something went wrong",
        stack : err.stack
    });
});

app.listen(4000,()=>{
    console.log("server is running......")
})

process.on("unhandledRejection",(err:ApiError)=>{
  console.log(err.name);
  console.log(err.message);
})


module.exports = app;