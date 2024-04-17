import React from "react";
import RowHeader from "../ui/admin/RowHeader";
import Link from "next/link";
import { getAllParcelData } from "../store/handller/parcel";

type Props = {};

const tbaleHeaders = [
  { id: 1, value: "Parcel Id" },
  { id: 2, value: "From" },
  { id: 3, value: "To" },
  { id: 4, value: "Current Status" },
  { id: 5, value: "Last updated date" },
  { id: 6, value: "Actions", className: "sr-only" },
];

const ParcelTable = async (props: Props) => {
  const allParcel = await getAllParcelData();

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
          {allParcel.parcel.map((item) => (
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
                <Link href={`/node/update-parcel/${item.id}`} className="py-3">
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ParcelTable;
