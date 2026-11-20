import type { Response, CookieOptions } from "express";

const isProd = process.env.NODE_ENV === "production";

export const cookieOptions: CookieOptions = {
    httpOnly: true,                       // الجافاسكربت في المتصفح مش هيقدر يقراه (حماية من XSS)
    secure: isProd,                       // HTTPS بس في الـ production
    sameSite: isProd ? "none" : "lax",    // "none" لو الفرونت على دومين مختلف
    maxAge: 7 * 24 * 60 * 60 * 1000,      // 7 أيام بالمللي ثانية
};

export const setAuthCookie = (res: Response, token: string) => {
    res.cookie("token", token, cookieOptions);
};