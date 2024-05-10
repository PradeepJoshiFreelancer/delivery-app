"use client";

import { nodeAtom } from "@/components/store/atom/node";
import { parcelAtom, parcelStatus } from "@/components/store/atom/parcel";
import { getAllNodesDetails } from "@/components/store/handller/node";
import {
  getAllParcelData,
  getAllParcelTrackingData,
  parcelById,
  parcelTrackingByParcelId,
} from "@/components/store/handller/parcel";
import DeliveryStepper from "@/components/ui/DeliveryStepper";
import SearchBox from "@/components/ui/SearchBox";
import TableDeliveryDetails from "@/components/ui/TableDeliveryDetails";
import TimeLine from "@/components/ui/TimeLine";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Parcel, Parcel_Transit_Status } from "@prisma/client";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

export default function Home() {
  console.log("Root page loaded");

  const [allParcel, setAllParcel] = useRecoilState(parcelAtom);
  const [allParcelTracking, setAllParcelTracking] =
    useRecoilState(parcelStatus);
  const [allNodes, setAllNodes] = useRecoilState(nodeAtom);

  const [trackingDetails, setTrackingDetails] = useState<Parcel | null>(null);
  const [deliveryTransitDetails, setdeliveryTransitDetails] = useState<
    Parcel_Transit_Status[] | []
  >([]);

  useEffect(() => {
    if (allParcel.length === 0) {
      getAllParcelData().then((response) => {
        setAllParcel(response.parcel);
        console.log("Parcel data loaded to Recoil.");
      });
    }
    if (allParcelTracking.length === 0) {
      getAllParcelTrackingData().then((response) => {
        console.log(response);

        setAllParcelTracking(response.allParcelTracking);
        console.log("Tracking data loaded to Recoil.");
      });
      if (allNodes.length === 0) {
        getAllNodesDetails().then((response) => {
          setAllNodes(response.node);
          console.log("Node data loaded to Recoil.");
        });
      }
    }
  }, [
    allParcel,
    allParcelTracking,
    allNodes,
    setAllParcel,
    setAllParcelTracking,
    setAllNodes,
  ]);

  const populateTrackingRecord = async (trackingId: number) => {
    const parcelState = allParcel.find((item) => item.id === trackingId);
    if (parcelState) {
      setTrackingDetails(parcelState);
      console.log("Parcel returned from recoil");
    } else {
      console.log("Parcel not found in recoil");

      const { status, parcel } = await parcelById(trackingId);
      if (status === 200 && parcel) {
        setTrackingDetails(parcel);
        setAllParcel((prevState) => [...prevState, parcel]);
      } else {
        setTrackingDetails(null);
      }
    }
    console.log(`allParcelTracking = ${JSON.stringify(allParcelTracking)}`);

    const parcelTrackingState = allParcelTracking.filter(
      (item) => item.parcelId === trackingId
    );
    console.log(`parcelTrackingState = ${JSON.stringify(parcelTrackingState)}`);

    if (parcelTrackingState.length > 0) {
      setAllParcelTracking(parcelTrackingState);
      setdeliveryTransitDetails(parcelTrackingState);
      console.log("Tracking data returned from recoil");
    } else {
      console.log("Loading all tracking from db");

      const { status, allParcelTracking } = await parcelTrackingByParcelId(
        trackingId
      );
      console.log(`status = ${status}`);
      console.log(`allParcelTracking = ${allParcelTracking}`);

      if (status === 200 && allParcelTracking && allParcelTracking.length > 0) {
        console.log("Tracking returned from recoil");
        setAllParcelTracking(allParcelTracking);
        setdeliveryTransitDetails(allParcelTracking);
      } else {
        setdeliveryTransitDetails([]);
      }
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
