import { Parcel, Parcel_Transit_Status } from "@prisma/client";
import { atom } from "recoil";
import { transitStatusDetails } from "../interface/parcel";

export const parcelAtom = atom<Parcel[]>({
  key: "parcelAtom",
  default: [],
});
export const parcelStatus = atom<transitStatusDetails[]>({
  key: "parcelStatus",
  default: [],
});
