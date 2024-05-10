"use client";
import React from "react";
import DropDownButton, { optionInterface } from "../DropDownButton";
import Button from "../Button";
import { useSession } from "next-auth/react";
import { addNewParcelTrackingStatus } from "@/components/store/handller/parcelTrackingStatus";
import { toast } from "react-toastify";
import { useRecoilState, useSetRecoilState } from "recoil";
import { parcelStatus } from "@/components/store/atom/parcel";
import { log } from "console";

type Props = {
  parcelId: number;
  idSfx: string;
  allNodes: any[];
  statusesOptions: optionInterface[];
};

const TrackingDetailsRowEditView = ({
  parcelId,
  idSfx,
  allNodes,

  statusesOptions,
}: Props) => {
  const { data: session } = useSession();
  const setTrackingStatus = useSetRecoilState(parcelStatus);
  console.log(`session = ${JSON.stringify(session)}`);

  let nodeData = allNodes.map((item) => ({
    id: item.id,
    value: item.nodeName,
    label: item.nodeCity,
  }));

  const onSaveHandller = async () => {
    let userId = 1;
    if (session && session.user)
      userId = Number((session.user as { email: string; id: string }).id);

    let nodeElement: HTMLSelectElement = document.getElementById(
      `node-${idSfx}`
    )! as HTMLSelectElement;
    let nodeValue = nodeElement.value;
    const nodeData = allNodes.find((item) => item.nodeName === nodeValue);

    let statusElement: HTMLSelectElement = document.getElementById(
      `delivery-status-${idSfx}`
    )! as HTMLSelectElement;
    let statusValue = statusElement.value;

    const transitData = {
      parcelId: parcelId,
      updatedById: userId,
      nodeId: nodeData ? nodeData.id : 0,
      status: statusValue,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const response = await addNewParcelTrackingStatus(transitData);

    if (response.status === 200) {
      console.log(`response = ${response}`);

      setTrackingStatus((prevState) => [...prevState, response.parcelTracking]);
      toast.success("Tracking data saved sucessfully!");
    } else {
      toast.error("Unable to save data");
    }
  };

  return (
    <div className="border-b dark:border-gray-700 w-full flex justify-between">
      <div className="px-4 py-3">
        <DropDownButton
          id={`node-${idSfx}`}
          header="Receiver Node"
          options={nodeData}
          showLabel={false}
        />
      </div>
      <div className="px-4 py-3">
        <DropDownButton
          id={`delivery-status-${idSfx}`}
          header="Status"
          options={statusesOptions}
          showLabel={false}
        />
      </div>
      <div className="px-4 py-3 max-h-full">
        <div className="flex justify-around">
          <Button
            text="Save"
            onClickHandller={onSaveHandller}
            buttonStyle="light"
            className="mt-1"
          />
        </div>
      </div>
    </div>
  );
};

export default TrackingDetailsRowEditView;
