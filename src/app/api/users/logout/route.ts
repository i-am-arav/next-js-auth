import { NextResponse } from 'next/server';

export const GET = () => {
    try {
        const response = NextResponse.json({message: 'Logout Successful', success: true});
        response.cookies.delete('token');

        return response;
    }
    catch(e:any) {
        return NextResponse.json({error: e.message}, {status: 500})
    }
}