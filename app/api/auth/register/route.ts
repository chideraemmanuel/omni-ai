import { registerUser } from '@/controllers/user';
import { connectToDatabase } from '@/lib/utils/database';
import { generateToken } from '@/lib/utils/generateToken';
import User from '@/models/user';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import generateOtp from '@/lib/utils/generateOtp';
import OTP from '@/models/otp';
import { transporter } from '@/config/nodemailer';
import { Resend } from 'resend';
import { hashData } from '@/lib/utils/hashData';

const resend = new Resend(process.env.RESEND_API_KEY);

interface RequestBodyTypes {
  name: string;
  email: string;
  password: string;
}

interface UserTypes {
  _id: string;
  name: string;
  email: string;
  password: string;
  auth_type: 'OMNIAI_AUTH_SERVICE' | 'GOOGLE_AUTH_SERVICE';
}

export async function POST(request: NextRequest) {
  const requestBody: RequestBodyTypes = await request.json();
  const { name, email, password } = requestBody;

  if (!name || !email || !password) {
    return NextResponse.json(
      { message: 'Please supply the required credentials' },
      { status: 400 }
    );
  }

  console.log('connecting to database...');
  await connectToDatabase();
  console.log('connected to database!');

  // CHECK IF EMAIL IS IN USE
  const userExists = await User.findOne({ email });

  if (userExists) {
    return NextResponse.json(
      { message: 'Email is already in use' },
      { status: 400 }
    );
  } else {
    try {
      // HASH PASSWORD
      // const salt = await bcrypt.genSalt(10);
      // const hashedPassword = await bcrypt.hash(password, salt);
      const hashedPassword = await hashData(password);

      // ADD USER TO DATABASE
      const createdUser: UserTypes = await User.create({
        name,
        email,
        password: hashedPassword,
        auth_type: 'OMNIAI_AUTH_SERVICE',
      });

      //   GENERATE SESSION TOKEN
      const token = generateToken(createdUser._id);

      // GENERATE OTP
      const otp = generateOtp();

      // HASH OTP
      // const otpSalt = 10;
      // const hashedOtp = await bcrypt.hash(otp, otpSalt);
      const hashedOtp = await hashData(otp);

      // STORE OTP
      await OTP.create({
        email,
        otp: hashedOtp,
        createdAt: Date.now(),
        expiresAt: Date.now() + 3600000,
      });

      // SEND OTP
      const mailOptions = {
        from: process.env.AUTH_EMAIL!,
        to: email,
        subject: 'Email Verification',
        html: `<p>Thank you for joining OmniAI. Please enter the code <b>${otp}</b> to complete registration</p>`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('failed to send mail', error);
          // return NextResponse.json({ error: 'Server error' }, { status: 500 });
        } else {
          console.log('Mail sent!', info.messageId);
        }
      });
      // const data = await resend.emails.send({
      //   from: 'OmniAi <onboarding@resend.dev>',
      //   to: email,
      //   subject: 'Email Verification',
      //   html: `<p>Thank you for joining OmniAI. Please enter the code <b>${otp}</b> to complete registration</p>`,
      //   //  react: EmailTemplate({ firstName: 'John' }),
      // });

      // console.log('email data', data);

      const response = NextResponse.json(
        {
          status: 'PENDING',
          message: `OTP has been sent to ${createdUser.email}`,
        },
        {
          status: 201,
          // headers: {
          //   'Set-Cookie': `token=${token}; httpOnly; path=/`,
          // },
        }
      );

      response.cookies.set('token', token, {
        maxAge: 60 * 60 * 24 * 7, // 1 week
        httpOnly: true,
      });

      return response;
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
  }

  //   return NextResponse.json({ message: 'register' });
}
