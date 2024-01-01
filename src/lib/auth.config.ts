import type { NextAuthConfig } from "next-auth";
import path from "path";

export const authConfig = {
  pages: {
    signIn: "/signin",
  },

  callbacks: {
    authorized({ auth, request }) {
      const { pathname } = request.nextUrl;
      const user = Boolean(auth?.user);

      if (user && (pathname === "/signin" || pathname === "/signup")) {
        return Response.redirect(new URL("/", request.nextUrl));
      }

      if (!user && pathname === "/secret") {
        return false;
      }

      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
