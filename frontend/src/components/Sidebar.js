"use client";
import { useContext, useEffect, useRef, useState } from "react";
import TeamMenu from "./TeamMenu";
import { OrgContext } from "@/context/OrgContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const { org, allProjects, checkPermission, createProject, onProjectCreation } = useContext(OrgContext)
  const [showTeams, setShowTeams] = useState(false)
  const teamRef = useRef()
  const router = useRouter()

  useEffect(() => {
    function handleClickOutside(e) {
      if (teamRef.current && !teamRef.current.contains(e.target)) {
        setShowTeams(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleNewProject() {
    const id = await onProjectCreation();
    router.push(`/dashboard/project/${id}`)
  }

  return (
    <aside className="w-60 h-full bg-white border-r border-gray-200 flex flex-col shrink-0">
      {/* Projects list */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider">
            Projects
          </h3>
          {checkPermission("PROJECT_CREATE") ? (
            <button
              className="w-6 h-6 flex items-center justify-center rounded-md bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm transition"
              onClick={handleNewProject}
            >
              +
            </button>
          ) : (
            <div className="w-6 h-6"></div>
          )}
        </div>

        <div className="flex flex-col gap-0.5">
          {allProjects?.map((proj) => (
            <Link
              key={proj.id}
              className="px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100 cursor-pointer transition truncate"
              href={`/dashboard/project/${proj.id}`}
            >
              {proj.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Team selector */}
      <div ref={teamRef} className="p-4 border-t border-gray-200 relative">
        <TeamMenu
          showTeams={showTeams}
          setShowTeams={setShowTeams}
        />

        <div
          onClick={() => setShowTeams(!showTeams)}
          className="flex items-center justify-between px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 cursor-pointer hover:bg-gray-100 transition"
        >
          <span className="text-sm text-gray-700 flex-1 truncate">
            {org ? org.name : "Select Team"}
          </span>
          <span className="text-xs text-gray-400 ml-2">▼</span>
        </div>
      </div>
    </aside>
  );
}