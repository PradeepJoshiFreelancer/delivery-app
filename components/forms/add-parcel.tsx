"use client";
import React from "react";
import Input from "../ui/Input";
import { finalStatuses } from "@prisma/client";
import { addNewParcel } from "../store/handller/parcel";
import { redirect } from "next/navigation";

const AddParcelForm = () => {
  const onSubmitHandller = async (formData: FormData) => {
    const newParcel = {
      toName: formData.get("to-name"),
      toPhone: formData.get("to-phone"),
      toAddress: formData.get("to-address"),
      toCity: formData.get("to-city"),
      fromName: formData.get("from-name"),
      fromPhone: formData.get("from-phone"),
      fromAddress: formData.get("from-address"),
      fromCity: formData.get("from-city"),
      currentStatus: finalStatuses.inTrasit,
      // allParcels: {
      //   create: [{ updatedById: 1 }],
      // },
    };
    await addNewParcel(newParcel);
    redirect("/admin");
  };
  return (
    <form className="space-y-4 md:space-y-6" action={onSubmitHandller}>
      <div className="flex justify-between">
        <Input
          id={"to-name"}
          title={"To Name"}
          type={"text"}
          placeholder={"John Doe"}
        />
        <Input
          id={"to-phone"}
          title={"To Phone"}
          type={"text"}
          placeholder={"Phone number"}
        />
      </div>
      <Input
        id={"to-address"}
        title={"Receiver Address"}
        type={"text"}
        placeholder={"Address"}
      />
      <Input
        id={"to-city"}
        title={"Receiver City"}
        type={"text"}
        placeholder={"City"}
      />
      <div className="flex justify-between">
        <Input
          id={"from-name"}
          title={"From Name"}
          type={"text"}
          placeholder={"Jane Doe"}
        />
        <Input
          id={"from-phone"}
          title={"From Phone"}
          type={"text"}
          placeholder={"Phone number"}
        />
      </div>
      <Input
        id={"from-address"}
        title={"Sender Address"}
        type={"text"}
        placeholder={"Address"}
      />
      <Input
        id={"from-city"}
        title={"Sender City"}
        type={"text"}
        placeholder={"City"}
      />
      <button
        type="submit"
        className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        Save
      </button>
    </form>
  );
};

export default AddParcelForm;
