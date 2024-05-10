import AdminSearchForm from "@/components/forms/admin-search";
import NodeTable from "@/components/ui/tables/node";
import ActionButtons from "@/components/ui/admin/Action";
import BottonNavigation from "@/components/ui/admin/BottonNavigation";
import React from "react";

type Props = {};

const NodeTracking = (props: Props) => {
  console.log("NodeTracking page loaded");

  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
      <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
            <AdminSearchForm />
            <ActionButtons />
          </div>
          <NodeTable />
          <BottonNavigation length={3} />
        </div>
      </div>
    </section>
  );
};

export default NodeTracking;
