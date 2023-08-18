//domain.com/verifytoken/${YOUR_TOKEN} - better for server
//domain.com/varifytoken?token=${YOUR_TOKEN} - better for Client

import nodemailer from 'nodemailer';
import User from '@/models/user';
import bcrypt from 'bcryptjs';


export const sendEmail = async ({ email, userId, emailType = 'VERIFY', }: any) => {
    try {
        const hashedToken = await bcrypt.hash(`${userId.toString()}`, 10);
        if (emailType === 'VERIFY') {
            await User.findByIdAndUpdate(userId, { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 });
        }
        else {
            await User.findByIdAndUpdate(userId, { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 });
        }

        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAILER_USER_NAME!,
                pass: process.env.MAILER_PASSWORD!
            }
        });

        const emailOptions = {
            from: 'aravind@gmail.com',
            to: email,
            subject: emailType === 'VERIFY' ? 'Verify Your Token' : 'Reset Your Password',
            html: `<p> click <a href="${process.env.domain!}/verifyEmail?token=${hashedToken}">here</a> to verify/reset to continue.</p>` 
        }

        const mailresponse =  await transporter.sendMail(emailOptions);
        return mailresponse;

    } catch (e: any) {

        throw new Error(e.message);
    }
}

