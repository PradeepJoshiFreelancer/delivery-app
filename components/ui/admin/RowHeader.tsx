import React from "react";

type Props = {
  value: string;
  className?: string;
};

const RowHeader = ({ value, className }: Props) => {
  return (
    <th scope="col" className={className ? className : "px-4 py-3"}>
      {value}
    </th>
  );
};

export default RowHeader;
