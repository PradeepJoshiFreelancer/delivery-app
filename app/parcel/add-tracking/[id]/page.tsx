"use client";
import useLoadtoRecoil from "@/components/hook/useLoadtoRecoil";
import TableDeliveryDetails from "@/components/ui/TableDeliveryDetails";
import { Card, CardContent } from "@/components/ui/card";
import TrackingDetails from "@/components/ui/tables/trackingDetails";
import { Parcel } from "@prisma/client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {};

let numId = 0;
const AddTrackingPage = (props: Props) => {
  const { allParcel } = useLoadtoRecoil({ loadAllParcel: true });

  const [trackingDetails, setTrackingDetails] = useState<Parcel | null>(null);

  const { id } = useParams();
  if (Number(id)) {
    numId = Number(id);
  }
  useEffect(() => {
    const parcelState = allParcel.find((item) => item.id === Number(numId));
    if (parcelState) {
      setTrackingDetails(parcelState);
      console.log("Parcel returned from recoil");
    }
  }, [allParcel]);

  return (
    <div className="flex justify-center w-full">
      <Card className="max-w-screen-md w-full cursor-pointer transition-all hover:border-primary/20 shadow-lg dark:shadow-black/60">
        {trackingDetails && (
          <CardContent className="transition-all ease-out duration-700">
            <TableDeliveryDetails trackingDetails={trackingDetails} />
            <TrackingDetails parcelId={numId} />
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default AddTrackingPage;
