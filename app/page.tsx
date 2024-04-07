"use client";
import {
  deleveries,
  deliveryTransitStatus,
  employees,
  nodes,
} from "@/components/store/dummy-data";
import DeliveryStepper from "@/components/ui/DeliveryStepper";
import SearchBox from "@/components/ui/SearchBox";
import TableDeliveryDetails from "@/components/ui/TableDeliveryDetails";
import TimeLine from "@/components/ui/TimeLine";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useState } from "react";

interface trackingDetailsInterface {
  trackingId: number;
  dispatchDate: string;
  expectedDate: string;
  currentStatus: string;
  to: string;
  toCity: string;
  from: string;
  fromCity: string;
}

interface deliveryTransitDetailsInterface {
  deliveryTransitId: number;
  deliveryId: number;
  node?: string;
  updateBy?: string;
  updateByContactNumber?: string;
  status: string;
  updatedAt: string;
}

export default function Home() {
  const [trackingDetails, setTrackingDetails] =
    useState<trackingDetailsInterface | null>(null);

  const [deliveryTransitDetails, setdeliveryTransitDetails] = useState<
    deliveryTransitDetailsInterface[]
  >([]);

  const populateTrackingRecord = (trackingId: number) => {
    const delivery = deleveries.find((item) => item.id === trackingId);

    if (delivery) {
      const tempTrackingDetails: trackingDetailsInterface = {
        trackingId: delivery.id,
        dispatchDate: delivery.dispatchDate,
        expectedDate: delivery.expectedDate,
        currentStatus: delivery.currentStatus.toString(),
        to: delivery.to,
        toCity: delivery.toCity,
        from: delivery.from,
        fromCity: delivery.fromCity,
      };
      setTrackingDetails(tempTrackingDetails);

      const deliveryTransit = deliveryTransitStatus.filter(
        (item) => item.deliveryId === trackingId
      );

      setdeliveryTransitDetails(
        deliveryTransit.map((item) => {
          const employee = employees.find((emp) => emp.id === item.updatedBy);
          let status = "";
          switch (item.status) {
            case 1: {
              status = "Received";
              break;
            }
            case 2: {
              status = "Dispatched";
              break;
            }
            case 3: {
              status = "Out for deivery";
              break;
            }
            default: {
              status = "Received";
              break;
            }
          }
          return {
            deliveryTransitId: item.id,
            deliveryId: item.deliveryId,
            node: nodes.find((node) => node.id === item.nodeId)?.nodeName,
            updateBy: employee?.name,
            updateByContactNumber: employee?.emailId,
            status: status,
            updatedAt: item.updatedAt,
          };
        })
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
