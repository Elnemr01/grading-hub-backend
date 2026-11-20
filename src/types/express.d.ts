import type { JwtPayload } from "jsonwebtoken";
import type { Payload } from "./types.ts";

declare global {
    namespace Express {
        interface Request {
        user?: string | JwtPayload;
        }
    }
}

export {};