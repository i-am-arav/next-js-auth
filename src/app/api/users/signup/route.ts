import { connect } from "@/dbConfig/dbConfig";
import User from '@/models/user';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs'
import { sendEmail } from '@/helpers/mailer';

connect();

export const POST = async (request: NextRequest) => {
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;
        console.log('reqBody', reqBody);

        const user = await User.findOne({ email });
        //if user alreay exist in db
        if (user) {
            return NextResponse.json({ error: 'User Already Exist' }, { status: 400 })
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create new user 
        const newUser = new User({
            username,
            password: hashedPassword,
            email
        });

        const response = await newUser.save();
        console.log('res', response);

        //sendEmail
        await sendEmail({ email, userId: response._id, emailType: 'VERIFY' })

        return NextResponse.json({ message: 'user Created Successfully', success: true, user: response }, { status: 201 })

    }
    catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 })

    }
}

