import { User } from "next-auth";
import prisma from "./database";

export async function getProfileFromSessionId(sessionId: string) {
  return await prisma.profile.findUnique({
    where: { id: sessionId },
    select: {
      id: true,
      email: true,
      display: true,
      image: true,
      isAdmin: true,
    },
  });
}

export async function getProfileIdByEmail(email: string) {
  return await prisma.profile.findUnique({
    where: { email },
    select: { id: true },
  });
}

export async function createProfileFromGithub(user: User) {
  const email = user.email;
  const image = user.image;
  if (!email) throw new Error("Github Email Not Found");

  try {
    if (Boolean(await getProfileIdByEmail(email))) return;

    const display = createDisplay(user.name, user.id);

    await prisma.profile.create({
      data: {
        email,
        image,
        display,
      },
    });
  } catch (error) {
    console.log(error);
  }
}

function createDisplay(name: string | null | undefined, id: string) {
  const display = name ?? createName();
  return display + id.slice(0, 2);
}

function createName() {
  const vinylWordList = [
    "vinyl",
    "record",
    "groove",
    "turntable",
    "spin",
    "platter",
  ];
  const musicWordList = [
    "melody",
    "rhythm",
    "beat",
    "note",
    "chord",
    "lyric",
    "harmony",
  ];

  const randomVinylWord =
    vinylWordList[Math.floor(Math.random() * vinylWordList.length)];

  const randomMusicWord =
    musicWordList[Math.floor(Math.random() * musicWordList.length)];

  return randomVinylWord + randomMusicWord;
}
