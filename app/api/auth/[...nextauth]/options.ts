import prisma from '@/app/utils/prisma';
import type { NextAuthOptions } from 'next-auth';
import Google from 'next-auth/providers/google';

export const options: NextAuthOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (!user.email) throw new Error('No user');

      // Create user if first time logging in, update name if there has been a change
      await prisma.user.upsert({
        where: {
          email: user.email,
        },
        create: {
          email: user.email,
          name: user.name,
        },
        update: {
          name: user.name,
        },
      });

      return true;
    },
  },
};
