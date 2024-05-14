import prisma from "@/components/db/prisma";

export const getEmployeeByEmail = async (email: string) => {
  return await prisma.employee.findFirst({
    where: {
      email: email,
    },
  });
};
