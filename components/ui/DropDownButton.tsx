"use client";
import React, { useState } from "react";

export interface optionInterface {
  id: number;
  value: string;
  label: string;
}

type Props = {
  id: string;
  header: string;
  showLabel?: boolean;
  defaultValue?: string;
  options: optionInterface[];
};

const DropDownButton = ({
  id,
  options,
  header,
  showLabel = true,
  defaultValue = "",
}: Props) => {
  return (
    <div className="max-w-sm mx-auto">
      {showLabel && (
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {header}
        </label>
      )}
      <select
        id={id}
        name={id}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {options.map((item) => (
          <option
            key={item.id}
            value={item.value}
            selected={item.label === defaultValue}
          >
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropDownButton;
