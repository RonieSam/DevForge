"use client";
import { useContext, useEffect, useRef, useState } from "react";
import TeamMenu from "./TeamMenu";
import { OrgContext } from "@/context/OrgContext";

export default function Sidebar() {
  const { org ,allProjects} = useContext(OrgContext);
  const [showTeams, setShowTeams] = useState(false);
  const teamRef = useRef();
  useEffect(() => {
    function handleClickOutside(e) {
      if (teamRef.current && !teamRef.current.contains(e.target)) {
        setShowTeams(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="w-64 h-full border flex flex-col">
      <div>
          {allProjects&&allProjects.map((proj)=><div key={proj.id} className="h-10 items-center border w-full flex justify-center">{proj.name}</div>)}
      </div>
      <div ref={teamRef} className="absolute bottom-0 w-64">
        {
          <TeamMenu
            showTeams={showTeams}
            setShowTeams={setShowTeams}
            className="absolute bottom-0 left-0 "
          />
        }
        <div
          className="h-15 overflow-hidden flex justify-center p-3 border "
          onClick={() => setShowTeams(!showTeams)}
        >
          {org == null ? "Teams" : org.name}
        </div>
      </div>
    </div>
  );
}
