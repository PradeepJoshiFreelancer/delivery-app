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

export const deleteParcelTrackingById = async (trackingId: number) => {
  const parcelTacking = await deleteParcelTracking(trackingId);

  return { status: 200, parcelTacking };
};
