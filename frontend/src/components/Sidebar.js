'use client';
import { useContext, useState } from "react";
import TeamMenu from "./TeamMenu";
import { OrgContext } from "@/context/OrgContext";

export default function Sidebar() {
  const [showTeams,setShowTeams]=useState(false)
  const {org}=useContext(OrgContext)
  return (
    <div className="w-64 h-full  flex flex-col">
      <div className="  border overflow-y-auto flex-1">
        {[...Array(50)].map((_, i) => (
        <div key={i}>Item {i}</div>
      ))}
    </div>
    <TeamMenu showTeams={showTeams} setShowTeams={setShowTeams}/>
      <div className="sticky h-30 verflow-hidden relative-group flex justify-center p-3 border " onClick={()=>setShowTeams(!showTeams)} >{org==null?"Teams":org.name}</div>
    </div>
  );
}
