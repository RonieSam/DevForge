'use client';

import { OrgContext } from '@/context/OrgContext'
import Link from 'next/link';
import React, { useContext } from 'react'

export default function TeamMenu({ showTeams, setShowTeams }) {
  const { allUserOrgs, selectOrg } = useContext(OrgContext);

  if (!showTeams) return null;

  return (
    // ADDED: z-50 to ensure it floats above all other content
    <div className="absolute bottom-full mb-1.5 left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50">
      
      <Link
        href="/dashboard/org"
        onClick={()=>{selectOrg(null)
                setShowTeams(false)
        }
          
        }
        className="block px-4 py-2.5 text-sm text-blue-600 font-medium hover:bg-gray-50 transition"
      >
        + New Team
      </Link>

      <div className="border-t border-gray-100"></div>

      {/* ADDED: Optional chaining (?.) to prevent crashes if data isn't loaded yet */}
      {allUserOrgs?.map((org) => (
        <div
          key={org.id}
          onClick={() => {
            selectOrg(org);
            setShowTeams(false);
          }}
          className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer transition"
        >
          {org.name}
        </div>
      ))}
    </div>
  );
}