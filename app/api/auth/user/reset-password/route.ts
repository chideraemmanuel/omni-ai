import { connectToDatabase } from '@/lib/utils/database';
import { compareHash, hashData } from '@/lib/utils/hashData';
import PasswordReset from '@/models/passwordReset';
import User from '@/models/user';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const { email, resetString, newPassword } = body;

  if (!email || !resetString) {
    return NextResponse.json(
      { message: 'Please provide the required credentials' },
      { status: 400 }
    );
  }

  try {
    console.log('connecting to database...');
    await connectToDatabase();
    console.log('connected to database!');

    try {
      const passwordResetRecord = await PasswordReset.findOne({ email });

      if (!passwordResetRecord) {
        return NextResponse.json(
          { message: 'No password reset request found' },
          { status: 404 }
        );
      }

      const {
        email: storedEmail,
        resetString: storedResetString,
        createdAt,
        expiresAt,
      } = passwordResetRecord;

      // CHECK EXPIRATION! ************************

      const resetStringValid = await compareHash(
        resetString,
        storedResetString
      );

      if (!resetStringValid) {
        return NextResponse.json(
          { message: 'Invalid reset string' },
          { status: 400 }
        );
      }

      try {
        const newHashedPassword = await hashData(newPassword);
        await User.updateOne({ email }, { password: newHashedPassword });

        try {
          await PasswordReset.deleteOne({ email });

          return NextResponse.json(
            { message: 'Password reset successfully' },
            { status: 200 }
          );
        } catch (error) {
          console.log('PASSWORD_RECORD_DELETION_ERROR', error);
          return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
          );
        }
      } catch (error: any) {
        console.log('[PASSWORD_UPDATE_ERROR]', error);
        return NextResponse.json(
          { message: 'Internal Server Error' },
          { status: 500 }
        );
      }
    } catch (error: any) {
      console.log('[RESET_RECORD_FETCH_ERROR]', error);
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

  //
  //
};
