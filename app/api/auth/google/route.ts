import { connectToDatabase } from '@/lib/utils/database';
import { generateToken } from '@/lib/utils/generateToken';
import { getGoogleOauthTokens } from '@/lib/utils/oauth';
import User from '@/models/user';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

interface GoogleUserTypes {
  _id: string;
  name: string;
  email: string;
  password: string;
}

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const { code } = body;

  if (!code) {
    return NextResponse.json(
      { message: 'Authentication failed' },
      { status: 403 }
    );
  }

  const response = await getGoogleOauthTokens(code!);

  if (response.status === 'FAILED') {
    return NextResponse.json({ message: 'Request failed' }, { status: 400 });
  }

  console.log(response);
  console.log('passed!');

  const userData = jwt.decode(response?.data?.id_token);

  console.log(userData);

  const { email, name } = userData;

  try {
    //  CONNECT TO DATABASE
    console.log('connecting to database...');
    await connectToDatabase();
    console.log('connected to database!');

    // CHECK IF EMAIL IS IN USE
    const userExists = await User.findOne({ email });
    // const { auth_type } = userExists;

    //   console.log(userExists);

    if (userExists && userExists?.auth_type !== 'GOOGLE_AUTH_SERVICE') {
      return NextResponse.json(
        { message: 'Email is already in use' },
        { status: 400 }
      );
    }

    if (userExists && userExists?.auth_type === 'GOOGLE_AUTH_SERVICE') {
      //   GENERATE SESSION TOKEN
      const token = generateToken(userExists._id);
      //   console.log(token);

      return NextResponse.json(
        {
          message: 'Login successful',
        },
        {
          status: 200,
          headers: {
            'Set-Cookie': `token=${token}; httpOnly; path=/`,
          },
        }
      );
    }

    // USER DOESN'T EXIST IN DATABASE
    //   ADD USER TO DATABASE
    const createdUser: GoogleUserTypes = await User.create({
      name,
      email,
      verified: true,
    });

    //   GENERATE SESSION TOKEN
    const token = generateToken(createdUser._id);
    //   console.log(token);

    return NextResponse.json(
      {
        message: 'Registration successful',
      },
      {
        status: 201,
        headers: {
          'Set-Cookie': `token=${token}; httpOnly; path=/`,
        },
      }
    );
  } catch (error) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
};

//
//
//
//
//
//
// {
//   "iss": "https://accounts.google.com",
//   "azp": "860051398022-sbdpl57nck8esqtq51o867ojgercpmha.apps.googleusercontent.com",
//   "aud": "860051398022-sbdpl57nck8esqtq51o867ojgercpmha.apps.googleusercontent.com",
//   "sub": "110820660007071877666",
//   "email": "emmanuelsomtoh.o@gmail.com",
//   "email_verified": true,
//   "at_hash": "O3MqpVQ1Q3zFSfM0YJTiLA",
//   "name": "Chidera Okonkwo",
//   "picture": "https://lh3.googleusercontent.com/a/ACg8ocLCshWPTGvM1_f-Zfv-bjoRXaHJ2ZifF4n-v-NULH4B=s96-c",
//   "given_name": "Chidera",
//   "family_name": "Okonkwo",
//   "locale": "en",
//   "iat": 1697357536,
//   "exp": 1697361136
// }