"use client";

import { parcelById } from "@/components/store/handller/parcel";
import { transitStatusDetails } from "@/components/store/interface/parcel";
import DeliveryStepper from "@/components/ui/DeliveryStepper";
import SearchBox from "@/components/ui/SearchBox";
import TableDeliveryDetails from "@/components/ui/TableDeliveryDetails";
import TimeLine from "@/components/ui/TimeLine";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Parcel } from "@prisma/client";
import { useState } from "react";

export default function Home() {
  const [trackingDetails, setTrackingDetails] = useState<Parcel | null>(null);

  const [deliveryTransitDetails, setdeliveryTransitDetails] = useState<
    transitStatusDetails[] | []
  >([]);

  const populateTrackingRecord = async (trackingId: number) => {
    const { status, parcel } = await parcelById(trackingId);

    if (parcel) {
      setTrackingDetails(parcel);
      setdeliveryTransitDetails(
        parcel.allParcels.map((item) => ({
          deliveryStatus: item,
          node: item.node,
          employee: item.employee,
        }))
      );
    } else {
      setTrackingDetails(null);
      setdeliveryTransitDetails([]);
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
