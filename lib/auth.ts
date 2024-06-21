import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt-ts";
import prisma from "./db";

const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/signIn",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "johndoe@email.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const userSession = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });

        if (!userSession) return null;

        const passwordMatch = await compare(
          credentials.password,
          userSession.password,
        );

        if (!passwordMatch) return null;

        return {
          id: userSession.id,
          username: userSession.nametag,
          email: userSession.email,
          name: userSession.fullName,
          image: userSession.image,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        return {
          ...token,
          username: user.username,
          image: user.image,
          name: user.name,
        };
      }
      if (trigger === "update") {
        return {
          ...token,
          ...session.user,
        };
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        return {
          ...session,
          user: {
            ...session.user,
            username: token.username,
          },
        };
      }
      return session;
    },
  },
};

export { authOptions };
