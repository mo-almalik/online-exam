import { decode } from 'next-auth/jwt';
import { cookies } from 'next/headers';

export const getToken = async () => {
  const authCookie = cookies().get('next-auth.session-token')?.value;

  try {
    const token = await decode({
      secret: process.env.NEXTAUTH_SECRET!,
      token: authCookie,
    });

    return token?.token;
  } catch (error) {
    void error;

    return null;
  }
};
