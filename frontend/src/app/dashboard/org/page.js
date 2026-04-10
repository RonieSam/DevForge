"use client";
import { OrgContext } from "@/context/OrgContext";
import React, { useContext, useEffect, useRef, useState } from "react";
import OrgRequest from "@/components/OrgRequest";

export default function Org() {
  const {
    allUserOrgs,
    getOrgsQuery,
    allOrgs,
    checkIfMember,
    selectOrg,
    sendRequest,
  } = useContext(OrgContext);

  const [search, setSearch] = useState("");
  const [hasRequest, setHasRequest] = useState(null);
  const searchRef=useRef();

  useEffect(() => {
    const delay = setTimeout(() => {
      if (search.trim().length > 1) {
        getOrgsQuery(search);
      }
    }, 400);

    function handleClickSearch(e){
      if(searchRef.current && !searchRef.current.contains(e.target))setSearch("");
    }
    document.addEventListener("mousedown",handleClickSearch);
    return () => {
      clearTimeout(delay);
      document.removeEventListener("mousedown",handleClickSearch)
    }
  }, [search]);

  async function handleSelectOrg(org) {
    const res = await checkIfMember(org.slug);
    if (res === true) {
        selectOrg(org);
        setSearch("");
    } else {
      setHasRequest(org);
      setSearch("");
    }
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      
      {/* Search Card */}
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-sm mb-6">
        <h2 className="text-lg font-semibold mb-4">Find Organization</h2>

        <div className="flex gap-2 relative">
          <input
            className="flex-1 px-4 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            placeholder="Search by slug..."
            onChange={(e) => setSearch(e.target.value)}
          />

          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            + New
          </button>

          {/* Search Results */}
          {search.trim().length > 1 && (
            <div  ref={searchRef} className="absolute top-full mt-2 w-full bg-white border rounded-lg shadow-md overflow-hidden z-50">
              {allOrgs.map((org) => (
                <div
                  key={org.id}
                  onClick={() => handleSelectOrg(org)}
                  className="px-4 py-2 flex justify-between text-sm hover:bg-gray-100 cursor-pointer"
                >
                  <span>{org.name}</span>
                  <span className="text-gray-500">{org.slug}</span>
                  <span className="text-gray-400">{org.owner}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Request Modal */}
      {hasRequest && (
        <OrgRequest
          org={hasRequest}
          setHasRequest={setHasRequest}
          sendRequest={sendRequest}
        />
      )}

      {/* Your Orgs */}
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold mb-4">
          Your Organizations
        </h2>

        {allUserOrgs && (
          <div className="flex flex-col gap-2">
            {allUserOrgs.map((org) => (
              <div
                onClick={()=>handleSelectOrg(org)}
                key={org.id}
                className="flex justify-between items-center px-4 py-3 rounded-lg hover:bg-gray-50 cursor-pointer transition"
              >
                <div>
                  <div className="font-medium text-gray-800">
                    {org.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {org.slug}
                  </div>
                </div>

                <div className="text-sm text-gray-400">
                  {org.owner}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}