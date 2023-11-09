import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '@/lib/utils/database';
import User from '@/models/user';
import { openai } from '@/config/openai';

interface Messagetypes {
  role: 'user' | 'assistant';
  content: string;
}

export const POST = async (request: NextRequest) => {
  const token = request.cookies.get('token')?.value;
  const body = await request.json();
  const messages = body;

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

      if (!messages) {
        return NextResponse.json(
          { message: 'Please enter a prompt' },
          { status: 400 }
        );
      }

      try {
        const chatCompletion = await openai.chat.completions.create({
          messages: messages,
          model: 'gpt-3.5-turbo',
          temperature: 1,
        });

        console.log(chatCompletion.choices);

        const responseMessage = chatCompletion.choices[0].message;

        return NextResponse.json(responseMessage, { status: 200 });
      } catch (error: any) {
        console.log('[CHAT_COMPLETION_ERROR]', error);
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

//
//
//
//
// const chatCompletion = await openai.chat.completions.create({
//   messages: [{ role: 'user', content: 'Hello' }],
//   model: 'gpt-3.5-turbo',
// });

//
//
//
//
//   // try {
//   const chatCompletion = await openai.chat.completions.create({
//     messages: messages,
//     model: 'gpt-3.5-turbo',
//   });

//   console.log(chatCompletion.choices);

//   const responseMessage = chatCompletion.choices[0].message;

//   return NextResponse.json(responseMessage, { status: 200 });
// } catch (error: any) {
//   console.log('[CHAT_ERROR]', error);
// }
