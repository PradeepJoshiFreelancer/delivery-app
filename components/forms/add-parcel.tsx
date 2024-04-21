"use client";
import React, { useEffect, useState } from "react";
import Input from "../ui/Input";
import { Parcel, finalStatuses } from "@prisma/client";
import {
  addNewParcel,
  getAllParcelData,
  updateParcelData,
} from "../store/handller/prisma/parcel";
import { redirect, useParams } from "next/navigation";
import { toast } from "react-toastify";
import ErrorMessage from "../ui/ErrorMessage";
import { useRecoilState, useRecoilValue } from "recoil";
import { parcelAtom } from "../store/atom/parcel";
import { getAllNodesDetails } from "../store/handller/prisma/node";

const errorInitalState = {
  toNameErrorMessage: "",
  toPhoneErrorMessage: "",
  toAddressErrorMessage: "",
  toCityErrorMessage: "",
  fromNameErrorMessage: "",
  fromPhoneErrorMessage: "",
  fromAddressErrorMessage: "",
  fromCityErrorMessage: "",
  currentStatusErrorMessage: "",
};
const errorMessageText = "Cannot be less than 4 bytes!";

const AddParcelForm = () => {
  const [errorMessage, setErrorMessage] = useState(errorInitalState);
  const [isEditing, setIsEditing] = useState(false);
  const [parcel, setParcel] = useState<Parcel | null>(null);
  const [allParcel, setAllParcel] = useRecoilState(parcelAtom);
  const { slug } = useParams();

  useEffect(() => {
    async function loadParcelData() {
      return (await getAllParcelData()).parcel;
    }

    if (slug.length > 1) {
      if (Number(slug[1])) {
        let finalParcel: Parcel[] = [];
        if (allParcel.length === 0) {
          getAllParcelData().then((response) => {
            finalParcel = response.parcel;
            console.log(response.parcel);
            const parcelIndex = finalParcel.findIndex(
              (item) => item.id === Number(+slug[1])
            );
            if (parcelIndex !== -1) {
              setParcel(finalParcel[parcelIndex]);
              setIsEditing(true);
            }
          });
        } else {
          finalParcel = allParcel;
          const parcelIndex = finalParcel.findIndex(
            (item) => item.id === Number(+slug[1])
          );
          if (parcelIndex !== -1) {
            setParcel(finalParcel[parcelIndex]);
            setIsEditing(true);
          }
        }
        console.log(finalParcel);
      }
    }
  }, [slug, allParcel]);
  const validateInput = (fieldName: string | undefined) => {
    return fieldName && (fieldName === "" || fieldName.length < 4);
  };

  const onSubmitHandller = async (formData: FormData) => {
    if (validateInput(formData.get("to-name")?.toString())) {
      setErrorMessage((prevState) => ({
        ...prevState,
        toNameErrorMessage: errorMessageText,
      }));
      return;
    }
    if (validateInput(formData.get("to-phone")?.toString())) {
      setErrorMessage((prevState) => ({
        ...prevState,
        toPhoneErrorMessage: errorMessageText,
      }));
      return;
    }
    if (validateInput(formData.get("to-address")?.toString())) {
      setErrorMessage((prevState) => ({
        ...prevState,
        toAddressErrorMessage: errorMessageText,
      }));
      return;
    }
    if (validateInput(formData.get("to-city")?.toString())) {
      setErrorMessage((prevState) => ({
        ...prevState,
        toCityErrorMessage: errorMessageText,
      }));
      return;
    }
    if (validateInput(formData.get("from-name")?.toString())) {
      setErrorMessage((prevState) => ({
        ...prevState,
        fromNameErrorMessage: errorMessageText,
      }));
      return;
    }
    if (validateInput(formData.get("from-phone")?.toString())) {
      setErrorMessage((prevState) => ({
        ...prevState,
        fromPhoneErrorMessage: errorMessageText,
      }));
      return;
    }
    if (validateInput(formData.get("from-address")?.toString())) {
      setErrorMessage((prevState) => ({
        ...prevState,
        fromAddressErrorMessage: errorMessageText,
      }));
      return;
    }
    if (validateInput(formData.get("from-city")?.toString())) {
      setErrorMessage((prevState) => ({
        ...prevState,
        fromCityErrorMessage: errorMessageText,
      }));
      return;
    }
    setErrorMessage(errorInitalState);
    const currentDate = new Date();

    let newParcel = {
      toName: formData.get("to-name"),
      toPhone: formData.get("to-phone"),
      toAddress: formData.get("to-address"),
      toCity: formData.get("to-city"),
      fromName: formData.get("from-name"),
      fromPhone: formData.get("from-phone"),
      fromAddress: formData.get("from-address"),
      fromCity: formData.get("from-city"),
      currentStatus: finalStatuses.inTrasit,
      dispatchDate: new Date(currentDate.setDate(currentDate.getDate() + 1)),
      expectedDate: new Date(currentDate.setDate(currentDate.getDate() + 4)),
      createdAt: currentDate,
      updatedAt: currentDate,
      // allParcels: {
      //   create: [{ updatedById: 1 }],
      // },
    };
    let response = null;
    let message = "";

    if (isEditing && parcel) {
      newParcel.createdAt = parcel.createdAt;
      newParcel.dispatchDate = parcel.dispatchDate;
      newParcel.expectedDate = parcel.expectedDate;
      response = await updateParcelData(parcel.id, newParcel);
      message = `Parcel id: ${response.parcel?.id} updated sucessfully!`;
      const updatedParcelIndex = allParcel.findIndex(
        (item) => item.id === parcel.id
      );
      if (updatedParcelIndex !== -1 && response.parcel) {
        const updatedAllNodes = [...allParcel];
        updatedAllNodes[updatedParcelIndex] = response.parcel;
        setAllParcel(updatedAllNodes);
      }
    } else {
      response = await addNewParcel(newParcel);
      message = `Parcel id: ${response.parcel?.id} added sucessfully!`;
    }
    if (response.status == 200) {
      toast.success(message);
      redirect("/admin");
    } else {
      if (response.status === 400) {
        toast.error(`${response.message}`);
      } else {
        toast.error("Unable to add the Node, please try again!");
      }
    }
  };
  return (
    <form className="space-y-4 md:space-y-6" action={onSubmitHandller}>
      <div className="flex justify-between">
        <div>
          <Input
            id={"to-name"}
            title={"To Name"}
            type={"text"}
            placeholder={"John Doe"}
            valueText={parcel ? parcel.toName : ""}
          />
          {errorMessage.toNameErrorMessage !== "" && (
            <ErrorMessage errorMsg={errorMessage.toNameErrorMessage} />
          )}
        </div>
        <div>
          <Input
            id={"to-phone"}
            title={"To Phone"}
            type={"text"}
            placeholder={"Phone number"}
            valueText={parcel ? parcel.toPhone : ""}
          />
          {errorMessage.toPhoneErrorMessage !== "" && (
            <ErrorMessage errorMsg={errorMessage.toPhoneErrorMessage} />
          )}
        </div>
      </div>
      <Input
        id={"to-address"}
        title={"Receiver Address"}
        type={"text"}
        placeholder={"Address"}
        valueText={parcel ? parcel.toAddress : ""}
      />
      {errorMessage.toAddressErrorMessage !== "" && (
        <ErrorMessage errorMsg={errorMessage.toAddressErrorMessage} />
      )}
      <Input
        id={"to-city"}
        title={"Receiver City"}
        type={"text"}
        placeholder={"City"}
        valueText={parcel ? parcel.toCity : ""}
      />
      {errorMessage.toCityErrorMessage !== "" && (
        <ErrorMessage errorMsg={errorMessage.toCityErrorMessage} />
      )}
      <div className="flex justify-between">
        <div>
          <Input
            id={"from-name"}
            title={"From Name"}
            type={"text"}
            placeholder={"Jane Doe"}
            valueText={parcel ? parcel.fromName : ""}
          />
          {errorMessage.fromNameErrorMessage !== "" && (
            <ErrorMessage errorMsg={errorMessage.fromNameErrorMessage} />
          )}
        </div>
        <div>
          <Input
            id={"from-phone"}
            title={"From Phone"}
            type={"text"}
            placeholder={"Phone number"}
            valueText={parcel ? parcel.fromPhone : ""}
          />
          {errorMessage.fromPhoneErrorMessage !== "" && (
            <ErrorMessage errorMsg={errorMessage.fromPhoneErrorMessage} />
          )}
        </div>
      </div>
      <Input
        id={"from-address"}
        title={"Sender Address"}
        type={"text"}
        placeholder={"Address"}
        valueText={parcel ? parcel.fromAddress : ""}
      />
      {errorMessage.fromAddressErrorMessage !== "" && (
        <ErrorMessage errorMsg={errorMessage.fromAddressErrorMessage} />
      )}
      <Input
        id={"from-city"}
        title={"Sender City"}
        type={"text"}
        placeholder={"City"}
        valueText={parcel ? parcel.fromCity : ""}
      />
      {errorMessage.fromCityErrorMessage !== "" && (
        <ErrorMessage errorMsg={errorMessage.fromCityErrorMessage} />
      )}
      <button
        type="submit"
        className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        {isEditing ? "Update" : "Save"}
      </button>
    </form>
  );
};

export default AddParcelForm;
