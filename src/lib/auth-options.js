import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import bcrypt from "bcrypt";
import { prisma } from "./prisma";

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    CredentialsProvider({
      credentials: {
        email: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const userFound = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!userFound) return null;

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          userFound.password,
        );
        if (!isPasswordValid) return null;

        return {
          id: userFound.id,
          email: userFound.email,
          name: userFound.fullname,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "github") return true;

      const email = user.email?.trim().toLowerCase();
      if (!email) return false;

      const databaseUser = await prisma.user.upsert({
        where: { email },
        update: {},
        create: {
          email,
          fullname: user.name,
          password: "",
        },
      });

      user.id = databaseUser.id;
      user.email = databaseUser.email;
      user.name = databaseUser.fullname ?? user.name;
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        email: token.email,
        name: token.name,
      };
      return session;
    },
  },
};
