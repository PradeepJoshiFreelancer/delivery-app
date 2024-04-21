import React from "react";

type Props = {
  errorMsg: string;
};

const ErrorMessage = ({ errorMsg }: Props) => {
  return (
    <>
      {errorMsg === "" ? null : (
        <p className="text-red-600 text-xs mt-2 ml-2">{errorMsg}</p>
      )}
    </>
  );
};

export default ErrorMessage;
