"use client";
import React from "react";
import Input from "../ui/Input";
import { redirect } from "next/navigation";
import { addNewNode } from "../store/handller/node";

const AddNodeForm = () => {
  const onSubmitHandller = async (formData: FormData) => {
    const newNode = {
      nodeName: formData.get("node-name"),
      nodeCity: formData.get("node-city"),
      nodeAddress: formData.get("node-address"),
    };
    await addNewNode(newNode);
    redirect("/node");
  };
  return (
    <form className="space-y-4 md:space-y-6" action={onSubmitHandller}>
      <div className="flex justify-between">
        <Input
          id={"node-name"}
          title={"Node Name"}
          type={"text"}
          placeholder={"Node Name"}
        />
        <Input
          id={"node-city"}
          title={"Node City"}
          type={"text"}
          placeholder={"Node City"}
        />
      </div>
      <Input
        id={"node-address"}
        title={"Node Address"}
        type={"text"}
        placeholder={"Address"}
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

export default AddNodeForm;
