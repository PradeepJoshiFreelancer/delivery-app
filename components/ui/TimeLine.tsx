import React from "react";

type Props = {
  deliveryTransitDetails: {
    deliveryTransitId: number;
    deliveryId: number;
    node?: string;
    updateBy?: string;
    updateByContactNumber?: string;
    status: string;
    updatedAt: string;
  }[];
};

const TimeLine = ({ deliveryTransitDetails }: Props) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-extrabold text-blue-600 my-4">
        Tracking Details:
      </h2>
      <ol className="relative border-s border-gray-200 dark:border-gray-700">
        {deliveryTransitDetails.map((trackingDetail) => {
          return (
            <li className="ms-4" key={trackingDetail.deliveryTransitId}>
              <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
              <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                {trackingDetail.updatedAt}
              </time>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {`${trackingDetail.node} - ${trackingDetail.status}`}
              </h3>
              <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                `Update by {trackingDetail.updateBy} - $
                {trackingDetail.updateByContactNumber}`
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default TimeLine;
