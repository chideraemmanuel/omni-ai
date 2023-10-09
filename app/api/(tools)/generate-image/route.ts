import { openai } from '@/config/openai';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const { prompt, amount, size } = body;

  console.log(body);

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
  } catch (error) {
    return NextResponse.json(
      { error: true, message: 'The image could not be generated' },
      {
        status: 400,
      }
    );
  }
};
