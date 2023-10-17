import axios from 'axios';

export const generateGoogleOauthUrl = () => {
  const base = 'https://accounts.google.com/o/oauth2/v2/auth';

  const options = {
    response_type: 'code',
    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
    // redirect_uri: 'http://localhost:3000/api/auth/register/google',
    redirect_uri: 'http://localhost:3000/google-callback',
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ].join(' '),
    access_type: 'offline',
  };

  const queryStrings = new URLSearchParams(options);

  // console.log(`${base}?${queryStrings.toString()}`);

  return `${base}?${queryStrings.toString()}`;
};

export const getGoogleOauthTokens = async (code: string) => {
  const base = 'https://oauth2.googleapis.com/token';

  const params = {
    code,
    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
    client_secret: process.env.GOOGLE_CLIENT_SECRET!,
    redirect_uri: 'http://localhost:3000/google-callback',
    grant_type: 'authorization_code',
  };

  const queryStrings = new URLSearchParams(params);

  // console.log(`${base}?${queryStrings.toString()}`);

  // return `${base}?${queryStrings.toString()}`;

  try {
    // const response = await axios.post(`${base}?${queryStrings.toString()}`);
    const response = await axios.post(base, params);
    // console.log('response from oauth function', response);
    return { status: 'SUCCESS', data: response?.data };
  } catch (error: any) {
    console.log('failde to get tokens', error);
    return { status: 'FAILED', data: error.response.data };
  }
};
