import React from "react";

type Props = {
  text: string;
  className?: string;
  buttonStyle?: string;
  buttonType?: "button" | "submit" | "reset" | undefined;
  onClickHandller?: () => void;
};

const Button = ({
  text,
  onClickHandller,
  className,
  buttonStyle = "regular",
  buttonType = "button",
}: Props) => {
  if (buttonStyle == "light") {
    return (
      <button
        type={buttonType}
        onClick={onClickHandller}
        className={`text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800, ${className}`}
      >
        {text}
      </button>
    );
  }

  return (
    <button
      type={buttonType}
      onClick={onClickHandller}
      className={`text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
