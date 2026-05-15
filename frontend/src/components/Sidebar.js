"use client";
import { useContext, useEffect, useRef, useState } from "react";
import TeamMenu from "./TeamMenu";
import { OrgContext } from "@/context/OrgContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const { org, allProjects,checkPermission,createProject,onProjectCreation} = useContext(OrgContext)
  const [showTeams, setShowTeams] = useState(false)
  const teamRef = useRef()
  const router=useRouter()
  useEffect(() => {
    function handleClickOutside(e) {
      if (teamRef.current && !teamRef.current.contains(e.target)) {
        setShowTeams(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleNewProject(){
    const id=await onProjectCreation();
    router.push(`/dashboard/project/${id}`)
  }

  return (
    
<div className="w-64 h-[calc(100vh-64px)] bg-white border-r flex flex-col justify-between">      
      {/* Top - Projects */}
      <div className="p-4">
        <div className="flex justify-between items-center flex-row mb-3">
        <h3 className="text-xs text-gray-500 uppercase">
          Projects
        </h3>
        {checkPermission("PROJECT_CREATE")?<button className="w-6 h-6 flex items-center justify-center rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 transition" onClick={handleNewProject}> + </button>
        :<div className="w-6 h-6"></div>}
      </div>
        <div className="flex flex-col gap-1">
          {allProjects?.map((proj) => (
            <Link
              key={proj.id}
              className="px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100 cursor-pointer transition"
              href={`/dashboard/project/${proj.id}`}
            >
              {proj.name}
            </Link>
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