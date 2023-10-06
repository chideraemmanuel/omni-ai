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
  const { messages } = body;

  if (!token) {
    // NO TOKEN
    return NextResponse.json('Not Authorized, no token', { status: 400 });
  } else {
    // TOKEN EXISTS
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    console.log('connecting to database...');
    connectToDatabase();
    console.log('connected to database.');

    // CHECK IF USER WITH ID FROM TOKEN EXISTS
    // @ts-ignore
    // const user = await User.findById(decoded.id)
    const user = await User.exists({ id: decoded.id });
    console.log('user', user);

    if (!user) {
      // NO USER WITH THE ID
      return NextResponse.json('Not authorized', { status: 400 });
    } else if (!messages) {
      // USER EXISTS BUT NO PROMPT
      return NextResponse.json(
        { message: 'Please enter a prompt' },
        { status: 400 }
      );
    } else {
      // USER EXISTS, AND PROMPT EXISTS

      const chatCompletion = await openai.chat.completions.create({
        messages: messages,
        model: 'gpt-3.5-turbo',
      });

      console.log(chatCompletion.choices);

      const responseMessage = chatCompletion.choices[0].message;

      return NextResponse.json(responseMessage, { status: 200 });
    }
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
