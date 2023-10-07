import { registerUser } from '@/controllers/user';
import { connectToDatabase } from '@/lib/utils/database';
import { generateToken } from '@/lib/utils/generateToken';
import User from '@/models/user';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

interface RequestBodyTypes {
  name: string;
  email: string;
  password: string;
}

interface UserTypes {
  _id: string;
  name: string;
  email: string;
  password: string;
}

export async function POST(request: NextRequest) {
  const requestBody: RequestBodyTypes = await request.json();
  //   console.log(requestBody);

  const { name, email, password } = requestBody;

  if (!name || !email || !password) {
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

  //   console.log(userExists);

  if (userExists) {
    return NextResponse.json(
      { error: 'Email is already in use' },
      { status: 400 }
    );
  } else {
    try {
      //   await registerUser({ name, email, password }); DOES NOT WORK!

      // HASH PASSWORD
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      //   ADD USER TO DATABASE
      const createdUser: UserTypes = await User.create({
        name,
        email,
        password: hashedPassword,
      });

      //   console.log(createdUser);

      //   GENERATE SESSION TOKEN
      const token = generateToken(createdUser._id);
      //   console.log(token);

      return NextResponse.json(
        {
          id: createdUser._id,
          name: createdUser.name,
          email: createdUser.email,
        },
        {
          status: 201,
          headers: {
            'Set-Cookie': `token=${token}; httpOnly; path=/ secure=${
              process.env.NODE_ENV === 'production'
            }`,
          },
        }
      );
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
  }

  //   return NextResponse.json({ message: 'register' });
}
