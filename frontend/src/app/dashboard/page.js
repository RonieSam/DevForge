"use client";

import TasksContainer from "@/components/TasksContainer";
import { AuthContext } from "@/context/AuthProvider";
import { OrgContext } from "@/context/OrgContext";
import React, { useContext, useEffect } from "react";

export default function Dashboard() {
  const { loading } = useContext(AuthContext);
  const {org}=useContext(OrgContext)
  return (
    <div className="flex flex-col  border h-[100%] justify-between">
      {org==null&&<div className="flex flex-col  border h-[100%] justify-between">
        <div className="flex flex-col items-center justify-center h-full text-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            No organization selected
          </h2>

          <p className="text-gray-500 mb-4">
            Select a team or create a new organization to get started
          </p>

          
        </div>
      </div>}
      {org!=null&&<TasksContainer />}

    </div>
  );
}
