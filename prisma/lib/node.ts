import prisma from "@/components/db/prisma";
import { Node } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { revalidatePath } from "next/cache";

export const addNode = async (newNode: any) => {
  const node = await prisma.node.create({
    data: newNode,
  });
  revalidatePath("/**");
  return node;
};
export const getAllNodes = async () => {
  return await prisma.node.findMany({
    include: {
      allParcels: true,
    },
  });
};

export const deleteNode = async (nodeId: number) => {
  let node = null;
  try {
    node = await prisma.node.delete({
      where: {
        id: nodeId,
      },
    });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      console.log("PrismaClientKnownRequestError happened");
    }
  }
  revalidatePath("/**");
  return node;
};

export const updateNode = async (id: number, node: any) => {
  const updatedNode = await prisma.node.update({
    where: {
      id: id,
    },
    data: node,
  });
  revalidatePath("/node/**");
  return updatedNode;
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
