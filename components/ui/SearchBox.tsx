"use client";
import { FormEvent, useState } from "react";
import ErrorMessage from "./ErrorMessage";

type Props = {
  popTrackingRecord: (trackingId: number) => void;
};

const SearchBox = ({ popTrackingRecord }: Props) => {
  const [trackingId, setTrackingId] = useState({
    value: 0,
    isLoading: false,
    errorMessage: "",
  });

  const searchSubmitHandller = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!Number(trackingId.value)) {
      setTrackingId((prevValue) => ({
        ...prevValue,
        errorMessage: "Tracking id should always be a number",
      }));
      setTrackingId((prevValue) => ({
        ...prevValue,
        errorMessage: "",
      }));
      return;
    }
    popTrackingRecord(trackingId.value);
  };

  return (
    <form className="max-w-md mx-auto my-4" onSubmit={searchSubmitHandller}>
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          onChange={(event) => {
            if (event.target.value === "") {
              setTrackingId((prevValues) => ({
                ...prevValues,
                value: 0,
                errorMessage: "",
              }));
              return;
            }
            if (!Number(+event.target.value)) {
              setTrackingId((prevValue) => ({
                ...prevValue,
                errorMessage: "Tracking id should always be a number",
              }));
              return;
            }
            setTrackingId((prevValue) => ({
              ...prevValue,
              value: Number(+event.target.value),
              errorMessage: "",
            }));
          }}
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Tacking id..."
          required
        />
        <button
          type="submit"
          className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
        </button>
      </div>
      <ErrorMessage errorMsg={trackingId.errorMessage} />
    </form>
  );
};

export default SearchBox;
