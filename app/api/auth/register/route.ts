import { connectToDatabase } from '@/lib/utils/database';
import { generateToken } from '@/lib/utils/generateToken';
import User from '@/models/user';
import { NextRequest, NextResponse } from 'next/server';
import generateOtp from '@/lib/utils/generateOtp';
import OTP from '@/models/otp';
import { transporter } from '@/config/nodemailer';
import { Resend } from 'resend';
import { hashData } from '@/lib/utils/hashData';
import mongoose from 'mongoose';
import sendEmail from '@/lib/utils/sendEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

interface RequestBodyTypes {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

interface UserTypes {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  auth_type: 'OMNIAI_AUTH_SERVICE' | 'GOOGLE_AUTH_SERVICE';
}

export async function POST(request: NextRequest) {
  const requestBody: RequestBodyTypes = await request.json();
  const { first_name, last_name, email, password } = requestBody;

  if (!first_name || !last_name || !email || !password) {
    return NextResponse.json(
      { message: 'Please supply the required credentials' },
      { status: 400 }
    );
  }

  try {
    console.log('connecting to database...');
    await connectToDatabase();
    console.log('connected to database!');

    try {
      const session = await mongoose.startSession();

      try {
        const transactionResult = await session.withTransaction(async () => {
          const userExists = await User.findOne({ email });

          if (userExists) {
            return NextResponse.json(
              { message: 'Email is already in use' },
              { status: 400 }
            );
          }

          const hashedPassword = await hashData(password);

          /**
           * USE ARRAY TO WRAP DATA PASSED TO moodel.create()
           * TO ALLOW FOR OPTIONS ON THE METHOD I.E SESSION
           */

          const createdUser: UserTypes[] = await User.create(
            [
              {
                first_name,
                last_name,
                email,
                password: hashedPassword,
                auth_type: 'OMNIAI_AUTH_SERVICE',
              },
            ],
            { session }
          );

          const token = generateToken(createdUser[0]._id);
          const otp = generateOtp();

          const hashedOtp = await hashData(otp);

          await OTP.create(
            [
              {
                email,
                otp: hashedOtp,
                createdAt: Date.now(),
                expiresAt: Date.now() + 3600000,
              },
            ],
            { session }
          );

          const info = await sendEmail({
            receipent: email,
            subject: 'Email Verification',
            html: `<p>Thank you for joining OmniAI. Please enter the code <b>${otp}</b> to complete registration</p>`,
          });

          console.log('Mail sent!', info.messageId);

          const response = NextResponse.json(
            {
              status: 'PENDING',
              message: `OTP has been sent to ${createdUser[0].email}`,
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
            // secure: process.env.NODE_ENV === 'production', // Secure in production
          });

          return response;
        });

        return transactionResult;
      } catch (error: any) {
        console.log('[TRANSACTION_ERROR]', error);
        return NextResponse.json({ error: 'Internal Server Error' });
      } finally {
        await session.endSession();
      }
    } catch (error: any) {
      console.log('[SESSION_START_ERROR]', error);
      return NextResponse.json(
        { error: 'Internal Server Error' },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.log('[DATABASE_CONNECTION_ERROR]', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// const data = await resend.emails.send({
//   from: 'OmniAi <onboarding@resend.dev>',
//   to: email,
//   subject: 'Email Verification',
//   html: `<p>Thank you for joining OmniAI. Please enter the code <b>${otp}</b> to complete registration</p>`,
//   //  react: EmailTemplate({ firstName: 'John' }),
// });

// console.log('email data', data);
