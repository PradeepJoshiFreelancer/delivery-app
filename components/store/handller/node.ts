"use server";

import { addNode, getAllNodes, getNodeById } from "@/prisma/lib/node";

export const addNewNode = async (newNode: any) => {
  const node = addNode(newNode);
  return { status: 200, message: "Node Added", node };
};

export const getAllNodesDetails = async () => {
  const allNodes = await getAllNodes();

  return { status: 200, node: allNodes };
};

export const nodeById = async (nodeId: number) => {
  const node = await getNodeById(nodeId);

  return { status: 200, node };
};
