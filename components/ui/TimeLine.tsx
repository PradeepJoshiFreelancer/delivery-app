import React from "react";
import { dateFormatter } from "../lib/utils";

type Props = {
  deliveryTransitDetails: any[];
};

const TimeLine = ({ deliveryTransitDetails }: Props) => {
  console.log(JSON.stringify(deliveryTransitDetails));

  return (
    <div className="p-4">
      <h2 className="text-xl font-extrabold text-blue-600 my-4">
        Tracking Details:
      </h2>
      <ol className="relative border-s border-gray-200 dark:border-gray-700">
        {deliveryTransitDetails.map((trackingDetail) => {
          return (
            <li className="ms-4 mt-4" key={trackingDetail.id}>
              <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
              <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                {dateFormatter(trackingDetail.updatedAt)}
              </time>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {`${trackingDetail.node.nodeName} - ${trackingDetail.status}`}
              </h3>
              <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                Update by {trackingDetail.employee?.name} -{" "}
                {trackingDetail.employee?.email}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default TimeLine;
