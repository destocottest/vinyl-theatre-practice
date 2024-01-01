import { PrismaClient } from "@prisma/client";

function prismClientSingleton() {
  return new PrismaClient();
}

declare global {
  var prisma: undefined | ReturnType<typeof prismClientSingleton>;
}

const prisma = globalThis.prisma ?? prismClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}
