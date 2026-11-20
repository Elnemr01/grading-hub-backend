import type { Request, Response, NextFunction } from 'express';
import ErrorHandler from '../utlis/errorHandler.ts';
import User from '../models/UserSchema.ts';
import { ErrorStatus } from '../utlis/errorStatus.ts';
import bcrypt from 'bcryptjs';
import createResponse from '../utlis/createResponse.ts';
import generateToken from '../utlis/generateToken.ts';
import { cookieOptions, setAuthCookie } from '../utlis/setAuthCookie.ts';




export const userRegister=ErrorHandler(async(req: Request, res: Response, next: NextFunction)=> {

    const { name, email, password,studentId,role }=req.body;

    const oldUser=await User.findOne({ email });
    if(oldUser){
        return res.status(400).json(createResponse(null, "User already exists", ErrorStatus.fail));
    }

    const hashedPassword=await bcrypt.hash(password,10);

    const newUser=await User.create({ name, email, password: hashedPassword,studentId,role })
    const createdUser=await User.findById(newUser._id).select("-password");
    const token=generateToken({ id: newUser._id.toString(), email: newUser.email });
    setAuthCookie(res, token);




    return res.status(201).json(createResponse(createdUser, "User registered successfully", ErrorStatus.success));


})


export const userLogin=ErrorHandler(async(req,res,next)=> {
    const { email, password }=req.body;
    const oldUser=await User.findOne({ email });
    if(!oldUser){
        return res.status(400).json(createResponse(null, "User Not Found", ErrorStatus.fail));
    }
    const isPasswordCorrect=await bcrypt.compare(password, oldUser.password);
    if(!isPasswordCorrect){
        return res.status(400).json(createResponse(null, "Invalid Credentials", ErrorStatus.fail));
    }

    const currentUser=await User.findOne({ email }).select("-password");
    if(!currentUser){
        return res.status(400).json(createResponse(null, "User Not Found", ErrorStatus.fail));
    }
    const token=generateToken({ id: currentUser._id.toString(), email: currentUser.email });
    setAuthCookie(res, token);

    return res.status(200).json(createResponse(currentUser, "User logged in successfully", ErrorStatus.success));


})


export const userLogout=ErrorHandler(async(req,res,next)=> {

    res.clearCookie("token", cookieOptions);

    return res.status(200).json(createResponse(null, "User logged out successfully", ErrorStatus.success));

})