import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import createResponse from '../utlis/createResponse.ts';
import { ErrorStatus } from '../utlis/errorStatus.ts';

export const validateToken=(req: Request, res: Response, next: NextFunction) => {
    const token=req.cookies.token;
    if(!token){
        return res.status(401).json(createResponse(null, "Unauthorized", ErrorStatus.fail));
    }

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET as string);
        req.user=decoded;
        next();
    }catch(err){
        return res.status(401).json(createResponse(null, "Unauthorized", ErrorStatus.fail));
    }
}