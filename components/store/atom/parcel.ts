import { Parcel, Parcel_Transit_Status } from "@prisma/client";
import { atom } from "recoil";

export const parcelAtom = atom<Parcel[]>({
  key: "parcelAtom",
  default: [],
});
export const parcelStatusAtom = atom<any[]>({
  key: "parcelStatus",
  default: [],
});
