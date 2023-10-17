import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  const response = NextResponse.json('Logout successful');
  response.cookies.set('token', '', { maxAge: 1 });

  return response;
  // return NextResponse.json({ message: 'logout successful'}, { headers: {}})
};
