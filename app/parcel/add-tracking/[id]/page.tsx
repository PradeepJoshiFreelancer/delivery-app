"use client";
import { parcelAtom, parcelStatus } from "@/components/store/atom/parcel";
import { parcelById } from "@/components/store/handller/parcel";
import TableDeliveryDetails from "@/components/ui/TableDeliveryDetails";
import { Card, CardContent } from "@/components/ui/card";
import TrackingDetails from "@/components/ui/tables/trackingDetails";
import { Parcel } from "@prisma/client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

type Props = {};

let numId = 0;
const AddTrackingPage = (props: Props) => {
  const [trackingDetails, setTrackingDetails] = useState<Parcel | null>(null);

  const [allParcel, setAllParcel] = useRecoilState(parcelAtom);

  const { id } = useParams();
  if (Number(id)) {
    numId = Number(id);
  }
  useEffect(() => {
    async function loadParcelDetails() {
      if (id && Number(id)) {
        const intId = Number(id);
        const parcelState = allParcel.find((item) => item.id === Number(intId));
        if (parcelState) {
          setTrackingDetails(parcelState);
          console.log("Parcel returned from recoil");
        } else {
          console.log("Parcel not found in recoil");

          const { status, parcel } = await parcelById(intId);
          if (status === 200 && parcel) {
            setTrackingDetails(parcel);
            setAllParcel((prevState) => [...prevState, parcel]);
          } else {
            setTrackingDetails(null);
          }
        }
        //   const parcelTrackingState = allParcelTracking.filter(
        //     (item) => item.parcelId === intId
        //   );
        //   if (parcelTrackingState.length > 0) {
        //     setAllParcelTracking(parcelTrackingState);
        //     console.log("Tracking data returned from recoil");
        //   } else {
        //     const { status, allParcelTracking } = await parcelTrackingByParcelId(
        //       intId
        //     );

        //     if (
        //       status === 200 &&
        //       allParcelTracking &&
        //       allParcelTracking.length > 0
        //     ) {
        //       console.log("Tracking returned from recoil");

        //       setAllParcelTracking(allParcelTracking);
        //       setdeliveryTransitDetails(allParcelTracking);
        //     } else {
        //       setdeliveryTransitDetails([]);
        //     }
      }
    }
    loadParcelDetails();
  }, [id, allParcel, setAllParcel]);

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
