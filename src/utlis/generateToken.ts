import jwt from 'jsonwebtoken';
import type { Payload } from '../types/types.ts';


const generateToken=(payload:Payload)=>{
    return jwt.sign(payload,process.env.JWT_SECRET as string,{ expiresIn: '1w' });
}

export default generateToken;