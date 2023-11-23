import { connectToDatabase } from '@/lib/utils/database';
import generateOtp from '@/lib/utils/generateOtp';
import OTP from '@/models/otp';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { transporter } from '@/config/nodemailer';
import { hashData } from '@/lib/utils/hashData';
import mongoose from 'mongoose';
import sendEmail from '@/lib/utils/sendEmail';

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
      const session = await mongoose.startSession();

      try {
        // const transactionResult = await session.withTransaction(async () => {
        // });
        // return transactionResult;

        /**
         * USES startTransaction() AS OPPOSED TO withTransaction()
         * withTransaction() DOESN'T RETURN NextResponse
         */

        session.startTransaction();

        const OtpRecord: OtpRecord | null = await OTP.findOne({ email });

        if (OtpRecord) {
          await OTP.deleteOne({ email }, { session });
        }

        const otp = generateOtp();
        const hashedOtp = await hashData(otp);

        /**
         * USE ARRAY TO WRAP DATA PASSED TO moodel.create()
         * TO ALLOW FOR OPTIONS ON THE METHOD I.E SESSION
         */
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
          html: `<p>Thank you for joining OmniAI. Please enter the code <b>${otp}</b> to verify your account.</p>`,
        });

        console.log('Mail sent!', info.messageId);

        await session.commitTransaction();

        return NextResponse.json(
          {
            message: `OTP sent to ${email}`,
          },
          {
            status: 201,
          }
        );
      } catch (error: any) {
        console.log('[TRANSACTION_ERROR]', error);
        await session.abortTransaction();
        return NextResponse.json({ error: 'Internal Server Error' });
      } finally {
        await session.endSession();
      }
    } catch (error: any) {
      console.log('[SESSION_START_ERROR]', error);
      return NextResponse.json({ error: 'Internal Server Error' });
    }
  } catch (error: any) {
    console.log('[DATABASE_CONNECTION_ERROR]', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
};
