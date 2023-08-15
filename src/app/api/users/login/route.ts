import { connect } from "@/dbConfig/dbConfig";
import User from '@/models/user';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';

connect();

export const POST = async (request: NextRequest) => {
    try {
        const reqBody = await request.json();
        const { email:reqEmail, password } = reqBody;
        console.log('reqBody',reqBody);

        const user = await User.findOne({email: reqEmail});
        //if user alreay exist in db
        if(!user) {
            return NextResponse.json({error: 'User does not exist'}, {status:404})
        }

        //check if password is correct
        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword) {
            return NextResponse.json({error: 'Invalid Password'}, {status:400})
        }
        
        const { _id: id, username, email } = user;
        //create a token
        const tokenData = {
            id,
            username,
            email
        }
        const token = jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:'1d'});

        //cookies
        const response = NextResponse.json({message:'Login Successful', success:true} ,{status:200});
        response.cookies.set("token", token, {httpOnly: true})




        console.log('res',response);

        return response;

    }
    catch(e:any) {
        return NextResponse.json({error: e.message}, {status:500})

    }
}

