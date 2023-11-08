import { generateToken } from '@/lib/utils/generateToken';
import OTP from '@/models/otp';
import User from '@/models/user';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { connectToDatabase } from '@/lib/utils/database';
import { compareHash } from '@/lib/utils/hashData';

interface OtpRecord {
  email: string;
  otp: string;
  createdAt: number;
  expiresAt: number;
}

export const POST = async (request: NextRequest) => {
  const body = await request.json();

  const { email, otp } = body;

  if (!email || !otp) {
    return NextResponse.json(
      { message: 'Please provide email and otp to verify' },
      { status: 400 }
    );
  }

  try {
    console.log('connecting to database...');
    await connectToDatabase();
    console.log('connected to database!');

    try {
      const OtpRecord: OtpRecord | null = await OTP.findOne({ email });

      if (!OtpRecord) {
        return NextResponse.json(
          { message: 'No otp record found' },
          { status: 404 }
        );
      }

      const {
        email: storedEmail,
        otp: storedOtp,
        createdAt,
        expiresAt,
      } = OtpRecord;

      //  CHECK EXPIRATION
      // if (expiresAt < Date.now()) {
      //   await OTP.deleteOne({ email });

      //   return NextResponse.json(
      //     { message: 'otp has already expired' },
      //     { status: 400 }
      //   );
      // }

      const otpValid = await compareHash(otp, storedOtp);

      if (!otpValid) {
        return NextResponse.json({ message: 'Invalid otp' }, { status: 400 });
      }

      try {
        await User.updateOne({ email }, { verified: true });

        try {
          await OTP.deleteOne({ email });

          return NextResponse.json(
            {
              message: 'Email verified successfully!',
            },
            {
              status: 200,
            }
          );
        } catch (error: any) {
          console.log('[OTP_RECORD_DELETION_ERROR]', error);
          return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
          );
        }
      } catch (error: any) {
        console.log('[USER_UPDATE_ERROR]', error);
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
