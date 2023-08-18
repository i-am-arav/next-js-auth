import { connect } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";


connect();

export const POST = async (request: NextRequest) => {
    try {
        const reqBody = await request.json();
        const { token } = reqBody;
        console.log(token);
        
        const user = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}});

        if(!user) {
            return NextResponse.json({message: 'Unable to verify token due to unfound user'}, {status:404});
        }

        user.isVerified = true;
        user.verifyToken = '';
        user.verifyTokenExpiry = undefined;
        const savedUser = await user.save();


        return NextResponse.json({message: 'Email verified Successfully', success:true, user:savedUser}, {status: 200})
        
    } catch (e:any) {
        return NextResponse.json({error: e.message}, {status: 500})
    }
}