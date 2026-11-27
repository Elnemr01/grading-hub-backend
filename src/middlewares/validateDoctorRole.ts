import type { Request, Response, NextFunction } from 'express';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import createResponse from '../utlis/createResponse.ts';
import { ErrorStatus } from '../utlis/errorStatus.ts';
import User from '../models/UserSchema.ts';




export const validateDoctorRole = async (req: Request, res: Response, next: NextFunction) => {
    
    const decoded = req.user;

    if(!decoded) {
        return res.status(401).json(createResponse(null, "Unauthorized", ErrorStatus.fail));
    }

    if (typeof decoded === "string") {
        return res.status(401).json(
            createResponse(null, "Unauthorized", ErrorStatus.fail)
        );

    }
    
    const payload = decoded as JwtPayload & { id: string };
    const user = await User.findById(payload.id);


    if(user?.role !== "admin") {
        return res.status(403).json(createResponse(null, "Forbidden: You do not have the required role", ErrorStatus.fail));
    }

    

    next();
}