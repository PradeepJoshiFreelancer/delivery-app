import React from "react";
import Grid3 from "./Grid3";
import Grid22 from "./Grid22";
import Grid1 from "./Grid1";

type Props = {};

const Body = (props: Props) => {
  return (
    <div>
      <Grid3 />
      <Grid22 />
      <Grid1 />
      <Grid22 />
    </div>
  );
};

export default Body;
