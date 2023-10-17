import bcrypt from 'bcrypt';
import User from '@/models/user';
import { connectToDatabase } from '@/lib/utils/database';
import { NextResponse } from 'next/server';
import { generateToken } from '@/lib/utils/generateToken';
import { hashData } from '@/lib/utils/hashData';

interface UserTypes {
  _id: string;
  name: string;
  email: string;
  password: string;
}

export const registerUser = async (credentials: Record<string, string>) => {
  const { name, email, password } = credentials;

  console.log(credentials);

  //  CONNECT TO DATABASE
  console.log('connecting to database...');
  await connectToDatabase();
  console.log('connected to database!');

  // CHECK IF EMAIL IS IN USE
  const userExists = await User.findOne({ email });

  console.log(userExists);

  if (userExists) {
    return NextResponse.json(
      { error: 'Email is already in use' },
      { status: 400 }
    );
  } else {
    try {
      // HASH PASSWORD
      // const salt = await bcrypt.genSalt(10);
      // const hashedPassword = await bcrypt.hash(password, salt);
      const hashedPassword = await hashData(password);

      //   ADD USER TO DATABASE
      const createdUser: UserTypes = await User.create({
        name,
        email,
        password: hashedPassword,
      });

      console.log(createdUser);

      //   GENERATE SESSION TOKEN
      const token = generateToken(createdUser._id);
      console.log(token);

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
};
