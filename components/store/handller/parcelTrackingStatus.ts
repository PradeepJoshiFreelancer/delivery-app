"use server";

import {
  addParcelTracking,
  deleteParcelTracking,
} from "@/prisma/lib/parcel_trnsit_status";
import { finalStatuses } from "@prisma/client";
import { z } from "zod";

const parcelTrackingSchema = z.object({
  id: z.number().optional(),
  parcelId: z.number(),
  updatedById: z.number(),
  nodeId: z.number(),
  status: z.nativeEnum(finalStatuses),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

type parcelTrackingStatusType = z.infer<typeof parcelTrackingSchema>;

// Parcel table insert new data
export const addNewParcelTrackingStatus = async (newParcelTracking: any) => {
  const results = parcelTrackingSchema.safeParse(newParcelTracking);

  if (!results.success) {
    return {
      status: 400,
      message: JSON.stringify(results.error.issues[0].message),
    };
  }
  const requestData: parcelTrackingStatusType = results.data;

  const parcelTracking = await addParcelTracking(requestData);
  return { status: 200, message: "Parcel Tracking Added", parcelTracking };
};

// export const updateParcelData = async (id: number, newParcel: any) => {
//   const results = parcelSchema.safeParse(newParcel);
//   if (!results.success) {
//     return {
//       status: 400,
//       message: JSON.stringify(results.error.issues[0].message),
//     };
//   }
//   const requestData: parcelType = results.data;

//   const parcel = await updateParcel(id, requestData);
//   return { status: 200, message: "Parcel Updated", parcel };
// };

export const deleteParcelTrackingById = async (trackingId: number) => {
  const parcelTacking = await deleteParcelTracking(trackingId);
  console.log(parcelTacking);

  return { status: 200, parcelTacking };
};

// // get all Parcel data
// export const getAllParcelData = async () => {
//   const allParcels = await getAllParcel();

//   return { status: 200, parcel: allParcels };
// };

// // get Parcel tracking data by Id
// export const parcelById = async (parcelId: number) => {
//   const result = parcelIdSchema.safeParse(parcelId);
//   if (!result.success) {
//     return {
//       status: 400,
//       message: JSON.stringify(result.error.issues[0].message),
//     };
//   }
//   const parcel = await getParcelById(parcelId);

//   return { status: 200, parcel: parcel };
// };

// // get all Parcel data
// export const getAllParcelTrackingData = async () => {
//   const allParcelTracking = await getAllParcelTracking();

//   return { status: 200, allParcelTracking: allParcelTracking };
// };

// // get Parcel tracking data by Id
// export const parcelTrackingByParcelId = async (parcelId: number) => {
//   const result = parcelIdSchema.safeParse(parcelId);
//   if (!result.success) {
//     return {
//       status: 400,
//       message: JSON.stringify(result.error.issues[0].message),
//     };
//   }
//   const parcelTracking = await getParcelTrackingDataByIParceld(parcelId);

//   return { status: 200, allParcelTracking: parcelTracking };
// };
