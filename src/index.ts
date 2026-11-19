import { configDotenv } from 'dotenv';
import type { Request, Response, NextFunction, RequestHandler } from "express";
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { corsConfig } from './config/cors.ts';
import rateLimit from 'express-rate-limit';
import { rateLimitOpts } from './config/rateLimit.ts';
import router from './routers/index.ts';
import type { AppError } from './types/types.ts';
import connectDB from './config/connectDB.ts';






configDotenv();
connectDB();


const app=express();

app.use(express.json());
app.set('trust proxy',1)
app.use(cookieParser())
app.use(cors(corsConfig));
app.use(rateLimit(rateLimitOpts))

app.use('/api',router);


app.use("*splat",(req,res)=> {
    res.status(404).json({ message: "Route not found" });
})


app.use((error : AppError, req:Request, res:Response, next:NextFunction) => {
    res.status(error.statusCode || 500).json({
        status: 'Error From Error Handler',
        message: error.message || 'Internal Server Error',
    });
});




const PORT=process.env.PORT;

if(process.env.NODE_ENV==='development'){
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`);
    });
}


export default app;
