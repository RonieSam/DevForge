'use client';

import { OrgContext } from '@/context/OrgContext'
import Link from 'next/link';
import React, { useContext } from 'react'

export default function TeamMenu({ showTeams, setShowTeams }) {
  const { allUserOrgs, selectOrg } = useContext(OrgContext);

  if (!showTeams) return null;

  return (
    // ADDED: z-50 to ensure it floats above all other content
    <div className="absolute bottom-full mb-2 left-0 w-52 bg-white border rounded-lg shadow-md overflow-hidden z-50">
      
      <Link
        href="/dashboard/org"
        className="block px-4 py-2 text-sm text-blue-600 hover:bg-gray-100"
      >
        + New Team
      </Link>

      <div className="border-t"></div>

      {/* ADDED: Optional chaining (?.) to prevent crashes if data isn't loaded yet */}
      {allUserOrgs?.map((org) => (
        <div
          key={org.id}
          onClick={() => {
            selectOrg(org);
            setShowTeams(false);
          }}
          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
        >
          {org.name}
        </div>
      ))}
    </div>
  );
}