"use client";
import ErrorMessage from "./ErrorMessage";

type Props = {
  id: string;
  title: string;
  type: string;
  placeholder: string;
  required?: boolean;
  errorMsg?: string;
  valueText?: string;
};

const Input = ({
  id,
  title,
  type,
  placeholder,
  required = true,
  errorMsg = "",
  valueText = "",
}: Props) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {title}
      </label>
      <input
        type={type}
        name={id}
        id={id}
        defaultValue={valueText}
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        required={required}
      />
      <ErrorMessage errorMsg={errorMsg} />
    </div>
  );
};

export default Input;
