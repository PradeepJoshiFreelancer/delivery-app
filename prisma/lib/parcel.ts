import prisma from "@/components/db/prisma";

export const addParcel = async (newParcel: any) => {
  const parcel = await prisma.parcel.create({
    data: newParcel,
  });
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
