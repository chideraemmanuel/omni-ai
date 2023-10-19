import axios from 'axios';
import { cookies } from 'next/headers';

interface UserTypes {
  id: string;
  name: string;
  email: string;
  //   verified: boolean;
}

export const getCurrentUser = async () => {
  //   console.log('gcu func', cookies().getAll());
  //   const response = await axios.get<UserTypes>('/api/auth/user');
  const response = await fetch('http://localhost:3000/api/auth/user', {
    headers: {
      Cookie: `token=${cookies().get('token')?.value}`,
    },
    credentials: 'include',
  });

  console.log(response.statusText);

  if (!response.ok) {
    // console.log(response)
    throw new Error('An error occured!!!!');
  }

  const data: UserTypes = await response.json();
  return data;
};
