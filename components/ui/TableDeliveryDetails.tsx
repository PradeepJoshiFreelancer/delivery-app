type Props = {
  trackingDetails: {
    trackingId: number;
    dispatchDate: string;
    expectedDate: string;
    currentStatus: string;
    to: string;
    toCity: string;
    from: string;
    fromCity: string;
  };
};

const TableDeliveryDetails = ({ trackingDetails }: Props) => {
  let status = "";
  switch (trackingDetails.currentStatus) {
    case "1": {
      status = "Yet to Dispatch";
      break;
    }
    case "2": {
      status = "In Transit";
      break;
    }
    case "3": {
      status = "Out for deivery";
      break;
    }
    default: {
      status = "Delivered";
      break;
    }
  }
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <tbody>
          <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
            <td
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Tracking Id:
            </td>
            <td className="px-6 py-4">{trackingDetails.trackingId}</td>
            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              Dispatch Date:
            </td>
            <td className="px-6 py-4">{trackingDetails.dispatchDate}</td>
          </tr>
          <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
            <td
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Expected Date:
            </td>
            <td className="px-6 py-4">{trackingDetails.expectedDate}</td>
            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              Current Status:
            </td>
            <td className="px-6 py-4">{status}</td>
          </tr>
          <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
            <td
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              From:
            </td>
            <td className="px-6 py-4">{trackingDetails.from}</td>
            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              From City:
            </td>
            <td className="px-6 py-4">{trackingDetails.fromCity}</td>
          </tr>
          <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
            <td
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              To:
            </td>
            <td className="px-6 py-4">{trackingDetails.to}</td>
            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              To City:
            </td>
            <td className="px-6 py-4">{trackingDetails.toCity}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TableDeliveryDetails;
