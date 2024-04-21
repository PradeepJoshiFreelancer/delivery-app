import AddParcelForm from "@/components/forms/add-parcel";
import { Card, CardTitle } from "@/components/ui/card";
import React from "react";

type Props = {};

const AddUpdateParcel = (props: Props) => {
  return (
    <div className="flex flex-col items-center justify-center w-full px-6 py-8 mx-auto md:h-screen lg:py-0">
      <Card className="w-full md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <CardTitle>Update parcel Details</CardTitle>
          <AddParcelForm />
        </div>
      </Card>
    </div>
  );
};

export default AddUpdateParcel;
