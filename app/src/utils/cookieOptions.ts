import { CookieOptions } from "express";

export const accessTokenCookieOptions: CookieOptions = {
    maxAge: 900000,
    httpOnly: true,
    domain: "localhost",
    path: "/",
    sameSite: "lax",
    secure: false
}

export const refreshTokenCookieOptions: CookieOptions = {
    ...accessTokenCookieOptions,
    maxAge: 86400000,
}

export default { accessTokenCookieOptions, refreshTokenCookieOptions }