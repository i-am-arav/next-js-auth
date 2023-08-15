import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken';

export const getDataFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get('token')?.value || '';
        const decodedTokenData = jwt.verify(token, process.env.TOKEN_SECRET!);
        console.log('decodedToken', decodedTokenData);
        
        return decodedTokenData;
    }
    catch(e: any) {
        throw new Error(e.message)

    }


}