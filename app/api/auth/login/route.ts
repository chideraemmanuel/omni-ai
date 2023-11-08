import { connectToDatabase } from '@/lib/utils/database';
import User from '@/models/user';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { generateToken } from '@/lib/utils/generateToken';

interface RequestBodyTypes {
  email: string;
  password: string;
}

export async function POST(request: NextRequest) {
  const requestBody: RequestBodyTypes = await request.json();

  const { email, password } = requestBody;

  if (!email || !password) {
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
          { message: 'No user with the provided email' },
          { status: 400 }
        );
      }

      const {
        password: hashedPassword,
        _id: id,
        first_name,
        last_name,
        email: userEmail,
        auth_type,
      } = userExists;

      if (auth_type === 'GOOGLE_AUTH_SERVICE') {
        return NextResponse.json(
          {
            message:
              'Account already verified with Google. Sign in with Google instead.',
          },
          { status: 400 }
        );
      }

      try {
        const passwordMatches = await bcrypt.compare(password, hashedPassword);

        if (!passwordMatches) {
          return NextResponse.json(
            { message: 'Incorrect password' },
            { status: 400 }
          );
        }

        const token = generateToken(id);

        const response = NextResponse.json(
          {
            id,
            first_name,
            last_name,
            email: userEmail,
          },
          {
            status: 200,
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
      } catch (error: any) {
        console.log('[PASSWORD_VERIFICATION_ERROR]', error);
        return NextResponse.json(
          { error: 'Internal Server Error' },
          { status: 500 }
        );
      }
    } catch (error: any) {
      console.log('[USER_FETCH_ERROR]', error);
      return NextResponse.json(
        { message: 'Internal Server Error' },
        { status: 500 }
      );
    }

    // return NextResponse.json({ message: 'Login user' });
  } catch (error: any) {
    console.log('[DATABASE_CONNECTION_ERROR]', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
