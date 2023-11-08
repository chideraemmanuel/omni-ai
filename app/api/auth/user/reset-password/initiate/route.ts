import PasswordReset from '@/models/passwordReset';
import User from '@/models/user';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { transporter } from '@/config/nodemailer';
import { hashData } from '@/lib/utils/hashData';
import { connectToDatabase } from '@/lib/utils/database';
import { v4 as uuid } from 'uuid';

export const POST = async (request: NextRequest) => {
  const body = await request.json();

  const { email, redirectUrl } = body;

  if (!email || !redirectUrl) {
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
      const userExists = await User.findOne({ email });

      if (!userExists) {
        return NextResponse.json(
          { message: 'No user with the supplied email.' },
          { status: 400 }
        );
      }

      if (!userExists.verified) {
        return NextResponse.json(
          { message: `Email hasn't been verified` },
          { status: 401 }
        );
      }

      if (userExists.auth_type === 'GOOGLE_AUTH_SERVICE') {
        return NextResponse.json(
          { message: `No user with the supplied email.` },
          { status: 400 }
        );
      }

      const resetString = uuid();

      const mailOptions = {
        from: process.env.AUTH_EMAIL!,
        to: email,
        subject: 'Password Reset',
        html: `<p>We heard you forgot your password. Please click <a href=${`${redirectUrl}?email=${encodeURIComponent(
          email
        )}&reset_string=${resetString}`}>here</a> to reset.</p>`,
      };

      try {
        const hashedResetString = await hashData(resetString);

        const passwordResetRecord = await PasswordReset.create({
          email,
          resetString: hashedResetString,
          createdAt: Date.now(),
          updatedAt: Date.now() + 3600000,
        });

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log('NODEMAILER_ERROR', error);
          } else {
            console.log('Mail sent!', info.messageId);
          }
        });

        return NextResponse.json(
          {
            status: 'PENDING',
            message: `Password reset link has been sent to ${email}`,
          },
          { status: 201 }
        );
      } catch (error: any) {
        console.log('RESET_RECORD_CREATION_ERROR', error);
        return NextResponse.json(
          { message: 'Internal Server Error' },
          { status: 500 }
        );
      }
    } catch (error: any) {
      console.log('[USER_FETCH_ERROR]', error);
      return NextResponse.json({ message: 'Internal Server Error' });
    }
  } catch (error: any) {
    console.log('[DATABASE_CONNECTION_ERROR]', error);
    return NextResponse.json({ message: 'Internal Server Error' });
  }
};
