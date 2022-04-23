import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../lib/prisma";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: `${process.env.GOOGLE_CLIENT_ID}`,
      clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: `${process.env.NEXTAUTH_SECRET}`,
  pages: {
    signOut: "/",
    error: "/",
    verifyRequest: "/",
  },
  callbacks: {
    async session({ session, user }) {
      const userId: string = user.id;
      session.userId = userId;
      return session;
    },
  },
});
