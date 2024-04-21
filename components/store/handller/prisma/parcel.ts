"use server";

import {
  addParcel,
  deleteParcel,
  getAllParcel,
  getAllParcelTracking,
  getParcelById,
  getParcelTrackingDataByIParceld,
  updateParcel,
} from "@/prisma/lib/parcel";
import { finalStatuses } from "@prisma/client";
import { z } from "zod";

const parcelSchema = z.object({
  id: z.number().optional(),
  toName: z.string().min(3, "To name cannot be less than 4 bytes!"),
  toPhone: z.string().min(3, "To phone cannot be less than 4 bytes!"),
  toAddress: z.string().min(3, "To address cannot be less than 4 bytes!"),
  toCity: z.string().min(3, "To city cannot be less than 4 bytes!"),
  fromName: z.string().min(3, "From name cannot be less than 4 bytes!"),
  fromPhone: z.string().min(3, "From phone cannot be less than 4 bytes!"),
  fromAddress: z.string().min(3, "From address cannot be less than 4 bytes!"),
  fromCity: z.string().min(3, "From city cannot be less than 4 bytes!"),
  currentStatus: z.nativeEnum(finalStatuses),
  dispatchDate: z.date().optional(),
  expectedDate: z.date().optional(),
  createdAt: z.date().optional(),
  updateAt: z.date().optional(),
});

const parcelIdSchema = z.number();

type parcelType = z.infer<typeof parcelSchema>;

// Parcel table insert new data
export const addNewParcel = async (newParcel: any) => {
  const results = parcelSchema.safeParse(newParcel);

  if (!results.success) {
    return {
      status: 400,
      message: JSON.stringify(results.error.issues[0].message),
    };
  }
  const currentDate = new Date();
  const requestData: parcelType = results.data;
  requestData.dispatchDate = new Date(
    currentDate.setDate(currentDate.getDate() + 1)
  );
  requestData.expectedDate = new Date(
    currentDate.setDate(currentDate.getDate() + 4)
  );
  const parcel = await addParcel(requestData);
  return { status: 200, message: "Parcel Added", parcel };
};

export const updateParcelData = async (id: number, newParcel: any) => {
  const results = parcelSchema.safeParse(newParcel);
  if (!results.success) {
    return {
      status: 400,
      message: JSON.stringify(results.error.issues[0].message),
    };
  }
  const requestData: parcelType = results.data;

  const parcel = await updateParcel(id, requestData);
  return { status: 200, message: "Parcel Updated", parcel };
};

export const deleteParcelById = async (parcelId: number) => {
  const parcel = await deleteParcel(parcelId);
  console.log(parcel);

  return { status: 200, parcel };
};

// get all Parcel data
export const getAllParcelData = async () => {
  const allParcels = await getAllParcel();

  return { status: 200, parcel: allParcels };
};

// get Parcel tracking data by Id
export const parcelById = async (parcelId: number) => {
  const result = parcelIdSchema.safeParse(parcelId);
  if (!result.success) {
    return {
      status: 400,
      message: JSON.stringify(result.error.issues[0].message),
    };
  }
  const parcel = await getParcelById(parcelId);

  return { status: 200, parcel: parcel };
};

// get all Parcel data
export const getAllParcelTrackingData = async () => {
  const allParcelTracking = await getAllParcelTracking();

  return { status: 200, allParcelTracking: allParcelTracking };
};

// get Parcel tracking data by Id
export const parcelTrackingByParcelId = async (parcelId: number) => {
  const result = parcelIdSchema.safeParse(parcelId);
  if (!result.success) {
    return {
      status: 400,
      message: JSON.stringify(result.error.issues[0].message),
    };
  }
  const parcelTracking = await getParcelTrackingDataByIParceld(parcelId);

  return { status: 200, allParcelTracking: parcelTracking };
};
