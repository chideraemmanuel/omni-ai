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

  //  CONNECT TO DATABASE
  console.log('connecting to database...');
  await connectToDatabase();
  console.log('connected to database!');

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

  // if (expiresAt < Date.now()) {
  //   await OTP.deleteOne({ email });

  //   return NextResponse.json(
  //     { message: 'otp has already expired' },
  //     { status: 400 }
  //   );
  // }

  // const otpValid = await bcrypt.compare(otp, storedOtp);
  const otpValid = await compareHash(otp, storedOtp);
  // console.log(otpValid);

  if (!otpValid) {
    return NextResponse.json({ message: 'Invalid otp' }, { status: 400 });
  }

  try {
    // const updatedUser = await User.findOneAndUpdate(
    //   { email },
    //   { verified: true }
    // );
    await User.updateOne({ email }, { verified: true });

    await OTP.deleteOne({ email });

    return NextResponse.json(
      // {
      //   id: updatedUser._id,
      //   name: updatedUser.name,
      //   email: updatedUser.email,
      // },
      {
        message: 'Email verified successfully!',
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log('VERIFICATION_ERROR', error);
    return NextResponse.json(
      { message: 'An error occured during verification' },
      { status: 500 }
    );
  }

  // NextResponse.json({}, { status: 200 });
};
