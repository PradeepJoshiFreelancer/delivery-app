import prisma from "@/components/db/prisma";
import { revalidatePath } from "next/cache";

export const addNode = async (newNode: any) => {
  const node = await prisma.node.create({
    data: newNode,
  });
  revalidatePath("/node/**");
  return node;
};
export const getAllNodes = async () => {
  return await prisma.node.findMany({
    include: {
      allParcels: true,
    },
  });
};

export const getNodeById = async (nodeId: number) => {
  return await prisma.node.findFirst({
    where: {
      id: nodeId,
    },
    include: {
      allParcels: {
        include: {
          employee: true,
          node: true,
        },
      },
    },
  });
};
