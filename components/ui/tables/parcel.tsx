"use client";
import React, { useEffect } from "react";
import RowHeader from "../admin/RowHeader";
import Link from "next/link";
import {
  deleteParcelById,
  getAllParcelData,
  getAllParcelTrackingData,
} from "../../store/handller/parcel";
import { useRecoilState } from "recoil";
import { parcelAtom, parcelStatus } from "../../store/atom/parcel";
import { toast } from "react-toastify";

type Props = {};

const tbaleHeaders = [
  { id: 1, value: "Parcel Id" },
  { id: 2, value: "From" },
  { id: 3, value: "To" },
  { id: 4, value: "Current Status" },
  { id: 5, value: "Last updated date" },
  { id: 6, value: "Actions", className: "text-center" },
];

const ParcelTable = (props: Props) => {
  const [allParcel, setAllParcel] = useRecoilState(parcelAtom);
  const [allParcelTracking, setAllParcelTracking] =
    useRecoilState(parcelStatus);
  useEffect(() => {
    if (allParcel.length === 0) {
      getAllParcelData().then((response) => {
        setAllParcel(response.parcel);
        console.log("Parcel data loaded to Recoil.");
      });
    }
  }, [allParcel, allParcelTracking, setAllParcel, setAllParcelTracking]);
  // const allParcel = getAllParcelData();
  async function parcelDeleteHandller(parcelId: number) {
    const response = await deleteParcelById(parcelId);
    if (response.status === 200) {
      setAllParcel((prevItems) =>
        prevItems.filter((item) => item.id !== parcelId)
      );
      toast.success(`Parcel Id ${response.parcel?.id} deleted!!`);
    }
  }
  return (
    <div className="overflow-x-auto">
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
          {allParcel.map((item) => (
            <tr className="border-b dark:border-gray-700" key={item.id}>
              <th
                scope="row"
                className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {item.id}
              </th>
              <td className="px-4 py-3">{item.fromCity}</td>
              <td className="px-4 py-3">{item.toCity}</td>
              <td className="px-4 py-3">{item.currentStatus}</td>
              <td className="px-4 py-3">{new Date().toDateString()}</td>
              <td className="px-4 py-3">
                <div className="flex justify-around">
                  <Link
                    href={`/parcel/update-parcel/${item.id}`}
                    className="py-3 text-blue-600 underline"
                  >
                    Edit
                  </Link>
                  <Link
                    href={`/parcel/add-tracking/${item.id}`}
                    className="py-3 text-blue-600 underline"
                  >
                    Add Tracking
                  </Link>
                  <Link
                    href="#"
                    className="py-3 text-red-600 underline"
                    onClick={() => parcelDeleteHandller(item.id)}
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

export default ParcelTable;
