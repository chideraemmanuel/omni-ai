import { connectToDatabase } from '@/lib/utils/database';
import generateOtp from '@/lib/utils/generateOtp';
import OTP from '@/models/otp';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { transporter } from '@/config/nodemailer';
import { hashData } from '@/lib/utils/hashData';

interface OtpRecord {
  email: string;
  otp: string;
  createdAt: number;
  expiresAt: number;
}

export const POST = async (request: NextRequest) => {
  const body = await request.json();

  const { email } = body;

  if (!email) {
    return NextResponse.json(
      { message: 'Please provide the email to verify' },
      { status: 400 }
    );
  }

  try {
    console.log('connecting to database...');
    await connectToDatabase();
    console.log('connected to database!');

    try {
      const OtpRecord: OtpRecord | null = await OTP.findOne({ email });

      if (OtpRecord) {
        try {
          await OTP.deleteOne({ email });
        } catch (error: any) {
          console.log('[OTP_RECORD_DELETION_ERROR]', error);
          return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
          );
        }
      }

      const otp = generateOtp();
      const hashedOtp = await hashData(otp);

      try {
        await OTP.create({
          email,
          otp: hashedOtp,
          createdAt: Date.now(),
          expiresAt: Date.now() + 3600000,
        });

        const mailOptions = {
          from: 'omni-ai@outlook.com',
          to: email,
          subject: 'Email Verification',
          html: `<p>Thank you for joining OmniAI. Please enter the code <b>${otp}</b> to verify your account.</p>`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log('NODEMAILER_ERROR', error);
          } else {
            console.log('Mail sent!', info.messageId);
          }
        });

        return NextResponse.json(
          {
            message: `OTP sent to ${email}`,
          },
          {
            status: 201,
          }
        );
      } catch (error: any) {
        console.log('[OTP_RECORD_CREATION_ERROR]', error);
        return NextResponse.json(
          { message: 'Internal Server Error' },
          { status: 500 }
        );
      }
    } catch (error: any) {
      console.log('[OTP_RECORD_FETCH_ERROR]', error);
      return NextResponse.json(
        { message: 'Internal Server Error' },
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
};
