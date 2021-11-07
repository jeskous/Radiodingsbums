import { PrismaClient } from "@prisma/client";
import { getFirstRow } from "./read";
const prisma = new PrismaClient();

export async function deleteFirstEntry() {
  const song: any = await getFirstRow();
  await prisma.song.delete({ where: { id: song.id } });
}
