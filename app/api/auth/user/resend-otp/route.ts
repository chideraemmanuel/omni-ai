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

  //  CONNECT TO DATABASE
  console.log('connecting to database...');
  await connectToDatabase();
  console.log('connected to database!');

  const OtpRecord: OtpRecord | null = await OTP.findOne({ email });

  if (OtpRecord) {
    await OTP.deleteOne({ email });
  }

  try {
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
      from: 'omni-ai@outlook.com',
      to: email,
      subject: 'Email Verification',
      html: `<p>Thank you for joining OmniAI. Please enter the code <b>${otp}</b> to verify your account.</p>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('NODEMAILER_ERROR', error);
        return NextResponse.json(
          { message: 'Error sending email' },
          { status: 500 }
        );
      } else {
        console.log('Mail sent!', info.messageId);
        return NextResponse.json(
          {
            message: `OTP sent to ${email}`,
          },
          {
            status: 201,
          }
        );
      }
    });

    // return NextResponse.json(
    //   {
    //     message: `OTP sent to ${email}`,
    //   },
    //   {
    //     status: 201,
    //   }
    // );
  } catch (error) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
};
