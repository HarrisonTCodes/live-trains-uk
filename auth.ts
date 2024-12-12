import prisma from '@/app/utils/prisma';
import NextAuth from 'next-auth';
import type { Provider } from 'next-auth/providers';
import Google from 'next-auth/providers/google';

const providers: Provider[] = [
  Google({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  }),
];

export const providerMap = providers.map((provider) => {
  if (typeof provider === 'function') {
    const providerData = provider();
    return { id: providerData.id, name: providerData.name };
  } else {
    return { id: provider.id, name: provider.name };
  }
});

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers,
  pages: {
    signIn: '/signin',
    signOut: '/signout',
  },
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

    authorized: async ({ auth }) => {
      return !!auth;
    },
  },
});
