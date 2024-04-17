"use server";

import { addParcel, getAllParcel, getParcelById } from "@/prisma/lib/parcel";

export const addNewParcel = async (newParcel: any) => {
  const parcel = addParcel(newParcel);
  return { status: 200, message: "Parcel Added", parcel };
};

export const getAllParcelData = async () => {
  const allParcels = await getAllParcel();

  return { status: 200, parcel: allParcels };
};

export const parcelById = async (parcelId: number) => {
  const parcel = await getParcelById(parcelId);

  return { status: 200, parcel: parcel };
};
