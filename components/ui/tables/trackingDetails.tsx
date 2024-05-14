"use client";
import React, { useEffect, useState } from "react";

import { useSetRecoilState } from "recoil";
import { parcelStatusAtom } from "../../store/atom/parcel";
import { toast } from "react-toastify";
import { optionInterface } from "../DropDownButton";
import { finalStatuses } from "@prisma/client";
import { deleteParcelTrackingById } from "@/components/store/handller/parcelTrackingStatus";
import useLoadtoRecoil from "@/components/hook/useLoadtoRecoil";
import { CardTitle } from "../card";
import TrackingDetailsRowEditView from "../add-tracking/TrackingDetailsRowEditView";
import RowHeader from "../admin/RowHeader";
import Link from "next/link";

type Props = {
  parcelId: number;
};

const tbaleHeaders = [
  { id: 1, value: "Node" },
  { id: 2, value: "Status" },
  { id: 6, value: "Actions", className: "text-center" },
];

const TrackingDetails = ({ parcelId }: Props) => {
  const { allParcelTracking, allNodes } = useLoadtoRecoil({
    loadAllNodes: true,
    loadAllParcelTracking: true,
  });
  const setAllParcelTracking = useSetRecoilState(parcelStatusAtom);
  const [statusesOptions, setStatusOptions] = useState<optionInterface[]>([]);

  const currentParcelTrackingData = allParcelTracking.filter(
    (item) => item.parcelId === parcelId
  );
  useEffect(() => {
    const statuses = Object.values(finalStatuses);
    const statusesArr = [];

    for (var key in statuses) {
      const valueText = statuses[key].replace(/([A-Z])/g, " $1");
      const finalResult = {
        id: Number(key) + 1,
        value: statuses[key],
        label: valueText.charAt(0).toUpperCase() + valueText.slice(1),
      };
      statusesArr.push(finalResult);
    }
    setStatusOptions(statusesArr);
  }, [setStatusOptions]);

  async function parcelTrackingDeleteHandller(trackingId: number) {
    const response = await deleteParcelTrackingById(trackingId);
    if (response.status === 200) {
      setAllParcelTracking((prevItems) =>
        prevItems.filter((item) => item.id !== trackingId)
      );
      toast.success(
        `Parcel Tracking Id ${response.parcelTacking?.id} deleted!!`
      );
    }
  }

  return (
    <div className="overflow-x-auto">
      <CardTitle className="text-blue-600 my-4">Add Tracking details</CardTitle>
      <TrackingDetailsRowEditView
        parcelId={parcelId}
        idSfx="new"
        allNodes={allNodes}
        statusesOptions={statusesOptions}
      />

      <h2 className="text-center m-4 font-extrabold text-xl text-blue-500">
        Existing Tracking Data
      </h2>

      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {tbaleHeaders.map((item) => (
              <RowHeader
                key={item.id}
                value={item.value}
                className={item.className}
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {currentParcelTrackingData.map((item) => (
            <tr className="border-b dark:border-gray-700" key={item.id}>
              <td className="px-4 py-3">{item.node.nodeName}</td>
              <td className="px-4 py-3">{item.status}</td>
              <td className="px-4 py-3">
                <div className="flex justify-around">
                  <Link
                    href="#"
                    onClick={() => parcelTrackingDeleteHandller(item.id)}
                    className="text-red-600 underline"
                  >
                    Delete
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrackingDetails;
