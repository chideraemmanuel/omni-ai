import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '@/lib/utils/database';
import User from '@/models/user';

interface UserTypes {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  verified: boolean;
}

export async function GET(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.json(
      { message: 'Not authorized, no token' },
      { status: 401 }
    );
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET!);

  if (!decoded) {
    console.log('[TOKEN_VERIFICATION_ERROR]');
    return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
  }

  try {
    console.log('connecting to database...');
    await connectToDatabase();
    console.log('connected to database!');

    try {
      const user: UserTypes | undefined | null = await User.findById(
        // @ts-ignore
        decoded?.id
      );

      if (!user) {
        const response = NextResponse.json(
          { message: 'Not authorized' },
          { status: 404 }
        );

        response.cookies.set('token', '', { maxAge: 1 });

        return response;
      }

      return NextResponse.json({
        id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        verified: user.verified,
      });
    } catch (error: any) {
      console.log('[USER_FETCH_ERROR]', error);
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
}

interface Updates {
  first_name?: string;
  last_name?: string;
}

export async function POST(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { first_name, last_name } = await request.json();

  if (!token) {
    return NextResponse.json(
      { message: 'Not authorized, no token' },
      { status: 401 }
    );
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET!);

  if (!decoded) {
    console.log('[TOKEN_VERIFICATION_ERROR]');
    return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
  }

  try {
    console.log('connecting to database...');
    await connectToDatabase();
    console.log('connected to database!');

    try {
      const user: UserTypes | undefined | null = await User.findById(
        // @ts-ignore
        decoded?.id
      );

      if (!user) {
        return NextResponse.json(
          { message: 'User not found' },
          { status: 404 }
        );
      }

      if (!user.verified) {
        return NextResponse.json(
          { message: 'User not verified' },
          { status: 401 }
        );
      }

      if (!first_name && !last_name) {
        return NextResponse.json(
          { error: 'Field(s) to be updated not passed' },
          { status: 400 }
        );
      }

      // build updates
      const updates: Updates = {};

      if (first_name) {
        updates.first_name = first_name;
      }

      if (last_name) {
        updates.last_name = last_name;
      }

      try {
        const updatedUser = await User.findByIdAndUpdate(user._id, updates, {
          new: true,
        });

        return NextResponse.json(updatedUser, { status: 200 });
      } catch (error: any) {
        console.log('[USER_UPDATE_ERROR]', error);
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
  } catch (error: any) {
    console.log('[DATABASE_CONNECTION_ERROR]', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
