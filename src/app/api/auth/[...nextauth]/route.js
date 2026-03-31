import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }
        const userFound = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!userFound) {
          return null;
        }
        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          userFound.password,
        );
        if (!isPasswordValid) {
          return null;
        }
        return {
          id: userFound.id,
          email: userFound.email,
          name: userFound.name,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      console.log("JWT Callback - Token:", token);
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
