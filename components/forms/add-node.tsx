"use client";
import React, { useEffect, useState } from "react";
import Input from "../ui/Input";
import { redirect, useParams } from "next/navigation";
import { addNewNode, updateNodeData } from "../store/handller/node";
import { toast } from "react-toastify";
import ErrorMessage from "../ui/ErrorMessage";
import { Node } from "@prisma/client";
import useLoadtoRecoil from "../hook/useLoadtoRecoil";
import { useSetRecoilState } from "recoil";
import { nodeAtom } from "../store/atom/node";

const nodeInitalState = {
  nodeNameErrorMessage: "",
  nodeCityErrorMessage: "",
  nodeAddressErrorMessage: "",
};
const AddNodeForm = () => {
  const [errors, setErrors] = useState(nodeInitalState);
  const [isEditing, setIsEditing] = useState(false);
  const [node, setNode] = useState<Node | null>(null);
  const { allNodes } = useLoadtoRecoil({ loadAllNodes: true });
  const setAllNodes = useSetRecoilState(nodeAtom);
  const { slug } = useParams();

  useEffect(() => {
    if (slug.length > 1) {
      if (Number(slug[1])) {
        const nodeIndex = allNodes.findIndex(
          (item: Node) => item.id === Number(+slug[1])
        );
        if (nodeIndex !== -1) {
          setNode(allNodes[nodeIndex]);
          setIsEditing(true);
        }
      }
    }
  }, [slug, allNodes]);

  const onSubmitHandller = async (formData: FormData) => {
    if (!formData.get("node-name") && formData.get("node-name") === "") {
      setErrors((prevState) => ({
        ...prevState,
        nodeNameErrorMessage: "Node Name cannot be blank!",
      }));
      return;
    }
    if (!formData.get("node-city") && formData.get("node-city") === "") {
      setErrors((prevState) => ({
        ...prevState,
        nodeCityErrorMessage: "Node city cannot be blank!",
      }));
      return;
    }
    if (!formData.get("node-address") && formData.get("node-address") === "") {
      setErrors((prevState) => ({
        ...prevState,
        nodeAddressErrorMessage: "Node Address cannot be blank!",
      }));
      return;
    }
    setErrors(nodeInitalState);
    const currentDate = new Date();
    const newNode = {
      nodeName: formData.get("node-name") || "",
      nodeCity: formData.get("node-city") || "",
      nodeAddress: formData.get("node-address") || "",
      createdAt: currentDate,
      updatedAt: currentDate,
    };
    let response = null;
    if (isEditing && node) {
      newNode.createdAt = node.createdAt;
      response = await updateNodeData(node.id, newNode);
      const updatedNodeIndex = allNodes.findIndex(
        (item) => item.id === node.id
      );
      if (updatedNodeIndex !== -1 && response.node) {
        console.log(updatedNodeIndex);

        const updatedAllNodes = [...allNodes];
        updatedAllNodes[updatedNodeIndex] = response.node;

        setAllNodes(updatedAllNodes);
      }
    } else {
      response = await addNewNode(newNode);
      if (response.status === 200 && response.node) {
        const latestNodes = [...allNodes, response.node];
        setAllNodes(latestNodes);
      }
    }
    if (response && response.status === 200 && response.node) {
      toast.success(
        `Node ${response.node.nodeName} ${
          isEditing ? "updated" : "added"
        } succesfully!!`
      );

      redirect("/node");
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
            id={"node-name"}
            title={"Node Name"}
            type={"text"}
            placeholder={"Node Name"}
            valueText={node ? node.nodeName : ""}
          />
          {errors.nodeNameErrorMessage !== "" && (
            <ErrorMessage errorMsg={errors.nodeNameErrorMessage} />
          )}
        </div>
        <div>
          <Input
            id={"node-city"}
            title={"Node City"}
            type={"text"}
            placeholder={"Node City"}
            valueText={node ? node.nodeCity : ""}
          />
          {errors.nodeCityErrorMessage !== "" && (
            <ErrorMessage errorMsg={errors.nodeCityErrorMessage} />
          )}
        </div>
      </div>
      <Input
        id={"node-address"}
        title={"Node Address"}
        type={"text"}
        placeholder={"Address"}
        valueText={node ? node.nodeAddress : ""}
      />
      {errors.nodeAddressErrorMessage !== "" && (
        <ErrorMessage errorMsg={errors.nodeAddressErrorMessage} />
      )}
      <div className="flex">
        <button
          type="submit"
          className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mx-2"
        >
          {isEditing ? "Update" : "Save"}
        </button>
      </div>
    </form>
  );
};

export default AddNodeForm;
