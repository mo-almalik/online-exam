import { JSON_HEADER } from './lib/constants/api.constants';
import { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/auth/sign-in',
  },

  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const response = await fetch(`${process.env.API}/auth/signin`, {
          method: 'POST',
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: {
            ...JSON_HEADER,
          },
        });

        const payload: APIResponse<LoginResponse> = await response.json();

        if ('code' in payload) {
          throw new Error(payload.message);
        }

        return {
          id: payload.user._id,
          token: payload.token,
          user: payload.user,
        };
      },
    }),
  ],

  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.token = user.token;
        token.user = user.user;
      }

      return token;
    },
    session: ({ session, token }) => {
      session.user = token.user;

      return session;
    },
  },
};
