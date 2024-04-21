import { Node } from "@prisma/client";
import { atom } from "recoil";

export const nodeAtom = atom<Node[]>({
  key: "nodeAtom",
  default: [],
});
