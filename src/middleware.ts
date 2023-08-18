import { NextRequest, NextResponse } from "next/server";


export const middleware = async (request: NextRequest) => {
    const path = request.nextUrl.pathname;

    const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyEmail';

    const token = request.cookies.get('token')?.value || ''

    if(isPublicPath && token) {
        return NextResponse.redirect(new URL('/', request.nextUrl));
    }

    if(!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }

}


export const config = {
    matcher: ['/', '/profile', '/logout', '/signin', '/signup','/verifyEmail']
}