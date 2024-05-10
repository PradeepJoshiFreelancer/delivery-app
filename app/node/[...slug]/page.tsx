import AddNodeForm from "@/components/forms/add-node";
import { Card, CardTitle } from "@/components/ui/card";
import React from "react";

type Props = {};

const AddUpdateNode = (props: Props) => {
  console.log("AddUpdateNode page loaded");

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <Card className="w-full md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <CardTitle>Update Node</CardTitle>
          <AddNodeForm />
        </div>
      </Card>
    </div>
  );
};

export default AddUpdateNode;
