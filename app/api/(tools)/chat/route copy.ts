import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '@/lib/utils/database';
import User from '@/models/user';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface Messagetypes {
  role: 'user' | 'assistant';
  content: string;
}

export const GET = async (request: NextRequest) => {
  const token = request.cookies.get('token')?.value;
  const body = await request.json();
  const { prompt } = body;

  if (!token) {
    return NextResponse.json('Not Authorized, no token', { status: 400 });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET!);

  console.log('connecting to database...');
  connectToDatabase();
  console.log('connected to database.');

  // @ts-ignore
  // const user = await User.findById(decoded.id)
  const user = await User.exists({ id: decoded.id });

  if (!user) {
    return NextResponse.json({ message: 'Not authorized' });
  } else {
    console.log('user', user);
    // fetch user chats
    // @ts-ignore
    const messages = await User.where({ id: decoded.id }).select('messages');

    console.log('messages', messages);
    // return messages!
  }
};

export const POST = async (request: NextRequest) => {
  const token = request.cookies.get('token')?.value;
  const body = await request.json();
  const { prompt } = body;

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
    } else if (!prompt) {
      // USER EXISTS BUT NO PROMPT
      return NextResponse.json(
        { message: 'Please enter a prompt' },
        { status: 400 }
      );
    } else {
      // USER EXISTS, AND PROMPT EXISTS
      // FETCH USER CHAT
      const messages: Messagetypes[] | [] | null = await User.where({
        // @ts-ignore
        id: decoded.id,
      }).select('messages');
      console.log('messages', messages);

      const updatedMessages: Messagetypes[] = [
        ...messages,
        { role: 'user', content: prompt },
      ];

      const chatCompletion = await openai.chat.completions.create({
        messages: updatedMessages,
        model: 'gpt-3.5-turbo',
      });

      console.log(chatCompletion.choices);

      const responseMessage = chatCompletion.choices[0].message;

      const { role, content } = responseMessage;

      // ADD RESPONSE TO DATABASE
      // User.updateOne(
      //   { _id: decoded.id },
      //   {
      //     $push: {
      //       messages: {
      //         $each: [
      //           { role: 'user', content: prompt },
      //           // { role: 'assistant', content: content },
      //           { role, content },
      //         ],
      //       },
      //     },
      //   }
      // );

      // User.updateMessages(id, prompt, content)

      return NextResponse.json({ message: content }, { status: 200 });
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
