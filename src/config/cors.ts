import type { CorsOptions } from "cors";


const allowedOrigins : (string | undefined )[] = [
    process.env.FRONTEND_URL,
    process.env.BACKEND_URL,
]


export const corsConfig : CorsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
};