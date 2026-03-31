export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentals: {
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
          return response
            .status(401)
            .json({ message: "Invalid email or password" });
        }
        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          userFound.password,
        );
        if (!isPasswordValid) {
          return response.status(401).json({ message: "Invalid password" });
        }
        return {
          id: userFound.id,
          email: userFound.email,
          name: userFound.name,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
      }
      return session;
    },
  },
};
