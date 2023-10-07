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
      { error: 'Please supply the required credentials' },
      { status: 400 }
    );
  }

  //  CONNECT TO DATABASE
  console.log('connecting to database...');
  await connectToDatabase();
  console.log('connected to database!');

  // CHECK IF EMAIL IS IN USE
  const userExists = await User.findOne({ email });

  if (!userExists) {
    return NextResponse.json(
      { error: 'No user with the provided email' },
      { status: 400 }
    );
  } else {
    const { password: hashedPassword, _id: id, name, email } = userExists;

    try {
      // CHECK IF PASSWORD MATCHES
      const passwordMatches = await bcrypt.compare(password, hashedPassword);

      if (!passwordMatches) {
        return NextResponse.json(
          { error: 'Incorrect password' },
          { status: 400 }
        );
      } else {
        //   GENERATE SESSION TOKEN
        const token = generateToken(id);
        //   console.log(token);

        // set cookie
        // const response = NextResponse.next();
        // const cookie = response.cookies.set('token', token, {
        //   maxAge: 60 * 60 * 24 * 7, // 1 week
        //   // httpOnly: true,
        //   secure: process.env.NODE_ENV === 'production', // Secure in production
        // });

        // console.log(cookie);

        return NextResponse.json(
          {
            id,
            name,
            email,
          },
          {
            status: 200,
            headers: {
              'Set-Cookie': `token=${token}; httpOnly; path=/`,
            },
          }
        );
      }
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
  }

  //   return NextResponse.json({ message: 'Login user' });
}
