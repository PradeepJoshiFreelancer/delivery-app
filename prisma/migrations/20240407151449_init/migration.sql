-- CreateEnum
CREATE TYPE "finalStatuses" AS ENUM ('yetToDispatch', 'inTrasit', 'outForDelivery', 'delivered');

-- CreateTable
CREATE TABLE "Parcel" (
    "id" SERIAL NOT NULL,
    "toName" TEXT NOT NULL,
    "toPhone" TEXT NOT NULL,
    "toAddress" TEXT NOT NULL,
    "toCity" TEXT NOT NULL,
    "fromName" TEXT NOT NULL,
    "fromPhone" TEXT NOT NULL,
    "fromAddress" TEXT NOT NULL,
    "fromCity" TEXT NOT NULL,
    "currentStatus" "finalStatuses" NOT NULL,
    "dispatchDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expectedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Parcel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Node" (
    "id" SERIAL NOT NULL,
    "nodeName" TEXT NOT NULL,
    "nodeCity" TEXT NOT NULL,
    "nodeAddress" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Node_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Parcel_Transit_Status" (
    "id" SERIAL NOT NULL,
    "parcelId" INTEGER NOT NULL,
    "nodeId" INTEGER NOT NULL,
    "status" "finalStatuses" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Parcel_Transit_Status_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Parcel_Transit_Status" ADD CONSTRAINT "Parcel_Transit_Status_parcelId_fkey" FOREIGN KEY ("parcelId") REFERENCES "Parcel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parcel_Transit_Status" ADD CONSTRAINT "Parcel_Transit_Status_nodeId_fkey" FOREIGN KEY ("nodeId") REFERENCES "Node"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
