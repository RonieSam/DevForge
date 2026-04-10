"use client";
import { useContext, useEffect, useRef, useState } from "react";
import TeamMenu from "./TeamMenu";
import { OrgContext } from "@/context/OrgContext";

export default function Sidebar() {
  const { org, allProjects } = useContext(OrgContext);
  const [showTeams, setShowTeams] = useState(false);
  const teamRef = useRef();

  useEffect(() => {
    function handleClickOutside(e) {
      if (teamRef.current && !teamRef.current.contains(e.target)) {
        setShowTeams(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    
<div className="w-64 h-[calc(100vh-64px)] bg-white border-r flex flex-col justify-between">      
      {/* Top - Projects */}
      <div className="p-4">
        <h3 className="text-xs text-gray-500 uppercase mb-3">
          Projects
        </h3>

        <div className="flex flex-col gap-1">
          {allProjects?.map((proj) => (
            <div
              key={proj.id}
              className="px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100 cursor-pointer transition"
            >
              {proj.name}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom - Teams */}
      <div ref={teamRef} className="p-4 border-t relative">
        
        <TeamMenu
          showTeams={showTeams}
          setShowTeams={setShowTeams}
        />

        <div
          onClick={() => setShowTeams(!showTeams)}
          className="flex items-center justify-between px-3 py-2 rounded-lg bg-gray-100 cursor-pointer hover:bg-gray-200 transition"
        >
          <span className="text-sm text-gray-700 flex-1 truncate">
            {org ? org.name : "Select Team"}
          </span>
          <span className="text-xs ml-2">▼</span>
        </div>
      </div>
    </div>
  );
}