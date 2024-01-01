import { NextResponse } from "next/server";
import prisma from "@/lib/database";
import { SignUpSchema } from "@/lib/schemas";
import * as bcrypt from "bcryptjs";

export async function POST(request: Request) {
  const body = await request.json();
  const parsedBody = SignUpSchema.safeParse(body);

  if (!parsedBody.success) {
    const error = parsedBody.error.issues[0].message;
    return NextResponse.json({ error });
  }
  try {
    if (await isEmailTaken(parsedBody.data.email)) {
      return NextResponse.json({ error: "email is taken" });
    }

    if (await isDisplayTaken(parsedBody.data.display)) {
      return NextResponse.json({ error: "display name is taken" });
    }

    const { email, password, display } = parsedBody.data;
    const hashed = await bcrypt.hash(password, 10);

    await prisma.profile.create({
      data: {
        email,
        password: hashed,
        display,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "placeholder error" });
  }
}

async function isEmailTaken(email: string) {
  return prisma.profile.findUnique({
    where: { email },
  });
}

async function isDisplayTaken(display: string) {
  return prisma.profile.findUnique({
    where: { display },
  });
}
