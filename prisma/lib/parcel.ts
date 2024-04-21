import prisma from "@/components/db/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { revalidatePath } from "next/cache";

export const addParcel = async (newParcel: any) => {
  const parcel = await prisma.parcel.create({
    data: newParcel,
  });
  revalidatePath("/admin/**");
  return parcel;
};

export const updateParcel = async (id: number, newParcel: any) => {
  const parcel = await prisma.parcel.update({
    where: {
      id: id,
    },
    data: newParcel,
  });
  revalidatePath("/admin/**");
  return parcel;
};

export const deleteParcel = async (parcelId: number) => {
  let parcel = null;
  try {
    await prisma.parcel_Transit_Status.deleteMany({
      where: {
        parcelId: parcelId,
      },
    });
    parcel = await prisma.parcel.delete({
      where: {
        id: parcelId,
      },
    });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      console.log("PrismaClientKnownRequestError happened");
    }
  }
  revalidatePath("/**");
  return parcel;
};

export const getAllParcel = async () => {
  return await prisma.parcel.findMany({
    include: {
      allParcels: true,
    },
  });
};

export const getParcelById = async (parcelId: number) => {
  return await prisma.parcel.findFirst({
    where: {
      id: parcelId,
    },
    include: {
      allParcels: {
        include: {
          employee: true,
          node: true,
        },
      },
    },
  });
};

export const getAllParcelTracking = async () => {
  return await prisma.parcel_Transit_Status.findMany({
    include: {
      employee: true,
      node: true,
    },
  });
};

export const getParcelTrackingDataByIParceld = async (parcelId: number) => {
  return await prisma.parcel_Transit_Status.findMany({
    where: {
      parcelId: parcelId,
    },
    include: {
      employee: true,
      node: true,
    },
  });
};
