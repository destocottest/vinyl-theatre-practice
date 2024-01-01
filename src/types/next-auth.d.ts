import { JWT } from "next-auth/jwt";

declare module "@auth/core/types" {
  interface Session {
    user: {
      id: string;
      email: string;
    } & DefaultSession["user"];
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id: string;
  }
}
