import { Employee, Node, Parcel_Transit_Status } from "@prisma/client";

export interface transitStatusDetails {
  deliveryStatus: Parcel_Transit_Status;
  employee?: Employee;
  node?: Node;
}
