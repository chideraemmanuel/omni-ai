import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '@/lib/utils/database';
import User from '@/models/user';

interface UserTypes {
  _id: string;
  name: string;
  email: string;
  password: string;
}

export async function GET(request: NextRequest) {
  const token = request.cookies.get('token2')?.value;

  //   console.log(cookie);

  //   const decoded = jwt.verify(
  //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MGEyOTZhNTU1YWQ0YzRmNzY0ODNmZiIsImlhdCI6MTY5NTE3MDUxOSwiZXhwIjoxNjk1MjU2OTE5fQ.N8oMslKDvau3wovC6FDTnT27PC-sj5FQ1d2mh5KI5OM',
  //     process.env.JWT_SECRET!
  //   );

  //   console.log(decoded);

  if (!token) {
    return NextResponse.json(
      { message: 'Not authorized, no token' },
      { status: 400 }
    );
  } else {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    await connectToDatabase();

    // @ts-ignore
    const user: UserTypes | undefined | null = await User.findById(decoded.id);

    if (user) {
      return NextResponse.json({
        id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      return NextResponse.json({ message: 'Not authorized' });
    }
  }

  //   return NextResponse.json({ message: 'User!' });
}
