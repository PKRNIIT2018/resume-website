import { SignJWT, jwtVerify } from 'jose';
import { AUTH_COOKIE_NAME } from './constants';

const SECRET_KEY = new TextEncoder().encode(import.meta.env.JWT_SECRET || import.meta.env.ADMIN_PASSWORD || 'fallback-secret-do-not-use-in-prod');

export async function createSessionCookie() {
    const token = await new SignJWT({ role: 'admin' })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('24h')
        .sign(SECRET_KEY);

    // Note: In Astro SSR, we might be setting this mostly via Astro.cookies, 
    // but if we need a raw string for headers, here it is.
    return token;
}

export async function verifySession(token: string | undefined) {
    if (!token) return false;
    try {
        const { payload } = await jwtVerify(token, SECRET_KEY);
        return payload.role === 'admin';
    } catch (error) {
        return false;
    }
}

export function isAuthenticated(cookies: any): Promise<boolean> {
    const token = cookies.get(AUTH_COOKIE_NAME)?.value;
    return verifySession(token);
}
