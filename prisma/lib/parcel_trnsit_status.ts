import prisma from "@/components/db/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { revalidatePath } from "next/cache";

export const addParcelTracking = async (newParcelTracking: any) => {
  const parcelStatus = await prisma.parcel_Transit_Status.create({
    data: newParcelTracking,
    include: {
      employee: true,
      node: true,
    },
  });
  revalidatePath("/**");
  return parcelStatus;
};

// export const updateParcel = async (id: number, newParcel: any) => {
//   const parcel = await prisma.parcel.update({
//     where: {
//       id: id,
//     },
//     data: newParcel,
//   });
//   revalidatePath("/admin/**");
//   return parcel;
// };

export const deleteParcelTracking = async (trackingId: number) => {
  let parcelTracking = null;
  try {
    parcelTracking = await prisma.parcel_Transit_Status.delete({
      where: {
        id: trackingId,
      },
      include: {
        employee: true,
        node: true,
      },
    });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      console.log("PrismaClientKnownRequestError happened");
    }
  }
  revalidatePath("/**");
  return parcelTracking;
};

// export const getAllParcel = async () => {
//   return await prisma.parcel.findMany({
//     include: {
//       allParcels: true,
//     },
//   });
// };

// export const getParcelById = async (parcelId: number) => {
//   return await prisma.parcel.findFirst({
//     where: {
//       id: parcelId,
//     },
//     include: {
//       allParcels: {
//         include: {
//           employee: true,
//           node: true,
//         },
//       },
//     },
//   });
// };

// export const getAllParcelTracking = async () => {
//   return await prisma.parcel_Transit_Status.findMany({
//     include: {
//       employee: true,
//       node: true,
//     },
//   });
// };

// export const getParcelTrackingDataByIParceld = async (parcelId: number) => {
//   return await prisma.parcel_Transit_Status.findMany({
//     where: {
//       parcelId: parcelId,
//     },
//     include: {
//       employee: true,
//       node: true,
//     },
//   });
// };
