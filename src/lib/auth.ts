import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import prisma from "./database";
import { SignInSchema } from "./schemas";
import * as bcrypt from "bcryptjs";
import { createProfileFromGithub, getProfileIdByEmail } from "./utils";

export const config = {
  ...authConfig,
  providers: [
    GithubProvider({
      clientId: process.env.NEXTAUTH_GITHUB_ID,
      clientSecret: process.env.NEXTAUTH_GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsedCredentials = SignInSchema.safeParse({
          email: credentials.email,
          password: credentials.password,
        });

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        try {
          const profile = await prisma.profile.findUnique({
            where: { email },
            select: { id: true, email: true, password: true },
          });

          if (!profile || !profile.password) return null;

          const verified = await bcrypt.compare(password, profile.password);
          if (!verified) return null;

          return { id: profile.id, email: profile.email };
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ account, user }) {
      if (account?.provider === "github") {
        await createProfileFromGithub(user);
      }

      return true;
    },
    async jwt({ token, user, account }) {
      if (account) {
        switch (account.provider) {
          case "github":
            if (!user.email) throw new Error("email not found");
            const email = user.email;
            const profile = await getProfileIdByEmail(email);
            if (!profile?.id) throw new Error("profile not found");
            user.id = profile.id;
            break;
        }
      }

      if (user) {
        token.id = user.id;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
