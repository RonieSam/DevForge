"use client";

import TasksContainer from "@/components/TasksContainer";
import { AuthContext } from "@/context/AuthProvider";
import { OrgContext } from "@/context/OrgContext";
import React, { useContext, useEffect } from "react";

export default function Dashboard() {
  const { loading } = useContext(AuthContext);
  const { org } = useContext(OrgContext)
  return (
    <div className="flex flex-col min-h-full bg-gray-50">
      <div className="max-w-7xl w-full mx-auto px-6 py-6 flex-1">
        {org == null && <TasksContainer />}
        {org != null && <TasksContainer org={org} />}
      </div>
    </div>
  );
}
