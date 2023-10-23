import PasswordReset from '@/models/passwordReset';
import User from '@/models/user';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { transporter } from '@/config/nodemailer';
import { hashData } from '@/lib/utils/hashData';
import { connectToDatabase } from '@/lib/utils/database';

export const POST = async (request: NextRequest) => {
  const body = await request.json();

  const { email, redirectUrl } = body;

  if (!email || !redirectUrl) {
    return NextResponse.json(
      { message: 'Please supply the required credentials' },
      { status: 400 }
    );
  }

  console.log('connecting to database...');
  await connectToDatabase();
  console.log('connected to database!');

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

  // use uuid to generate!
  const resetString = '2';

  const mailOptions = {
    from: process.env.AUTH_EMAIL!,
    to: email,
    subject: 'Password Reset',
    html: `<p>We heard you forgot your password. Please click on this <a href=${`${redirectUrl}?reset_string=${resetString}`}></a> to reset.</p>`,
  };

  try {
    // const salt = 10;
    // const hashedResetString = await bcrypt.hash(resetString, salt);
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
        return NextResponse.json(
          { error: 'Error sending email' },
          { status: 500 }
        );
      } else {
        console.log('Mail sent!', info.messageId);
        return NextResponse.json(
          {
            status: 'PENDING',
            message: `Password reset link has been sent to ${email}`,
          },
          { status: 201 }
        );
      }
    });
  } catch (error) {
    console.log('PASSWORD_RESET_ERROR', error);
    return NextResponse.json(
      { message: 'Password reset error' },
      { status: 500 }
    );
  }
};
