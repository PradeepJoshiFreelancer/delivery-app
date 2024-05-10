"use server";

import {
  addNode,
  deleteNode,
  getAllNodes,
  getNodeById,
  updateNode,
} from "@/prisma/lib/node";
import { z } from "zod";

const nodeSchema = z.object({
  nodeName: z.string().min(3, "Node name should be grater than 3 bytes!"),
  nodeCity: z.string().min(3, "Node city should be grater than 3 bytes!"),
  nodeAddress: z.string().min(3, "Node address should be grater than 3 bytes!"),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

type nodeType = z.infer<typeof nodeSchema>;

export const addNewNode = async (newNode: any) => {
  const results = nodeSchema.safeParse(newNode);

  if (!results.success) {
    return {
      status: 400,
      message: JSON.stringify(results.error.issues[0].message),
    };
  }
  const requestData: nodeType = results.data;
  const node = await addNode(requestData);
  return { status: 200, message: "Node Added", node };
};

export const getAllNodesDetails = async () => {
  const allNodes = await getAllNodes();

  return { status: 200, node: allNodes };
};

export const updateNodeData = async (id: number, newNode: any) => {
  const results = nodeSchema.safeParse(newNode);
  if (!results.success) {
    return {
      status: 400,
      message: JSON.stringify(results.error.issues[0].message),
    };
  }
  const requestData: nodeType = results.data;

  const node = await updateNode(id, requestData);
  return { status: 200, message: "Node Updated", node };
};

export const deleteNodeById = async (nodeId: number) => {
  const node = await deleteNode(nodeId);
  console.log(node);

  return { status: 200, node };
};

export const nodeById = async (nodeId: number) => {
  const node = await getNodeById(nodeId);

  return { status: 200, node };
};
