"use client";

import React, { useEffect } from "react";
import RowHeader from "../ui/admin/RowHeader";
import Link from "next/link";
import {
  deleteNodeById,
  getAllNodesDetails,
} from "../store/handller/prisma/node";
import { useRecoilState } from "recoil";
import { nodeAtom } from "../store/atom/node";
import { toast } from "react-toastify";

type Props = {};

const tbaleHeaders = [
  { id: 1, value: "City" },
  { id: 2, value: "Name" },
  { id: 3, value: "Addess" },
  { id: 6, value: "Actions", className: "sr-only" },
];

const NodeTable = (props: Props) => {
  const [allNodes, setAllNodes] = useRecoilState(nodeAtom);

  useEffect(() => {
    if (allNodes.length === 0) {
      getAllNodesDetails().then((response) => {
        if (response.node.length > 0) {
          setAllNodes(response.node);
          console.log("Node data loaded to Recoil.");
        }
      });
    }
  }, [allNodes, setAllNodes]);

  async function nodeDeleteHandller(nodeId: number) {
    const response = await deleteNodeById(nodeId);
    if (response.status === 200) {
      setAllNodes((prevItems) =>
        prevItems.filter((item) => item.id !== nodeId)
      );
      toast.success(`Node ${response.node?.nodeName} deleted!!`);
    }
    console.log(4);
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {tbaleHeaders.map((item) => (
              <RowHeader
                key={item.id}
                value={item.value}
                className={item.className}
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {allNodes.map((item) => (
            <tr className="border-b dark:border-gray-700" key={item.id}>
              <th
                scope="row"
                className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {item.id}
              </th>
              <td className="px-4 py-3">{item.nodeCity}</td>
              <td className="px-4 py-3">{item.nodeAddress}</td>
              <td className="px-4 py-3">
                <div className="flex justify-around">
                  <Link
                    href={`/node/update-node/${item.id}`}
                    className="py-3 text-blue-600 underline"
                  >
                    Edit
                  </Link>
                  <Link
                    href="#"
                    onClick={() => nodeDeleteHandller(item.id)}
                    className="py-3 text-red-600 underline"
                  >
                    Delete
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NodeTable;
