import { openai } from '@/config/openai';
import { connectToDatabase } from '@/lib/utils/database';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (request: NextRequest) => {
  const token = request.cookies.get('token')?.value;
  const body = await request.json();
  const { prompt, amount, size } = body;

  if (!token) {
    return NextResponse.json('Not Authorized, no token', { status: 400 });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET!);

  try {
    console.log('connecting to database...');
    connectToDatabase();
    console.log('connected to database.');

    try {
      // @ts-ignore
      const user = await User.exists({ _id: decoded.id });

      if (!user) {
        return NextResponse.json('Not authorized', { status: 400 });
      }

      if (!prompt || !amount || !size) {
        return NextResponse.json(
          { error: true, message: 'Please provide the required options' },
          {
            status: 400,
          }
        );
      }

      const imageSize =
        size === '256' ? '256x256' : size === '512' ? '512x512' : '1024x1024';

      try {
        const response = await openai.images.generate({
          prompt,
          n: parseInt(amount),
          size: imageSize,
        });

        return NextResponse.json(response.data, { status: 200 });
      } catch (error: any) {
        console.log('[IMAGE_GENERATION_ERROR]', error);
        return NextResponse.json(
          { message: 'Internal Server Error' },
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
};
