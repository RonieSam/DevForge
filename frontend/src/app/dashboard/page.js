"use client";

import TasksContainer from "@/components/TasksContainer";
import { AuthContext } from "@/context/AuthProvider";
import { OrgContext } from "@/context/OrgContext";
import React, { useContext, useEffect } from "react";

export default function Dashboard() {
  const { loading } = useContext(AuthContext);
  const {org}=useContext(OrgContext)
  return (
    <div className="flex flex-col  min-h-full ">
      {org==null&&<TasksContainer/>}
      {org!=null&&<TasksContainer org={org}/>}

    </div>
  );
}
