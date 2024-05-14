"use client";

import useLoadtoRecoil from "@/components/hook/useLoadtoRecoil";
import DeliveryStepper from "@/components/ui/DeliveryStepper";
import SearchBox from "@/components/ui/SearchBox";
import TableDeliveryDetails from "@/components/ui/TableDeliveryDetails";
import TimeLine from "@/components/ui/TimeLine";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Parcel, Parcel_Transit_Status } from "@prisma/client";
import { useState } from "react";

export default function Home() {
  console.log("Root page loaded");

  const { allParcel, allParcelTracking } = useLoadtoRecoil({
    loadAllParcel: true,
    loadAllParcelTracking: true,
  });
  const [trackingDetails, setTrackingDetails] = useState<Parcel | null>(null);
  const [deliveryTransitDetails, setdeliveryTransitDetails] = useState<
    Parcel_Transit_Status[] | []
  >([]);

  const populateTrackingRecord = async (trackingId: number) => {
    const parcelState = allParcel.find((item) => item.id === trackingId);
    if (parcelState) {
      setTrackingDetails(parcelState);
      console.log("Parcel returned from recoil");
    }

    const parcelTrackingState = allParcelTracking.filter(
      (item) => item.parcelId === trackingId
    );

    if (parcelTrackingState.length > 0) {
      setdeliveryTransitDetails(parcelTrackingState);
      console.log("Tracking data returned from recoil");
    }
  };

  return (
    <div className="flex justify-center w-full">
      <Card className="max-w-screen-md w-full cursor-pointer transition-all hover:border-primary/20 shadow-lg dark:shadow-black/60">
        <CardTitle className="text-blue-600 my-4">Track your parcel</CardTitle>
        <SearchBox popTrackingRecord={populateTrackingRecord} />
        {trackingDetails && (
          <CardContent className="transition-all ease-out duration-700">
            <DeliveryStepper status={trackingDetails.currentStatus} />
            <TableDeliveryDetails trackingDetails={trackingDetails} />
            <Card className="my-4">
              {deliveryTransitDetails.length > 0 ? (
                <TimeLine deliveryTransitDetails={deliveryTransitDetails} />
              ) : (
                <p className="p-4 text-center">No tracking data available.</p>
              )}
            </Card>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
