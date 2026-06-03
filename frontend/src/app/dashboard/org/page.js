"use client";
import { OrgContext } from "@/context/OrgContext";
import React, { useContext, useEffect, useRef, useState } from "react";
import OrgRequest from "@/components/OrgRequest";
import CreateOrganizationModal from "@/components/OrgForm";
import Link from "next/link";

export default function Org() {
  const {
    allUserOrgs,
    getOrgsQuery,
    allOrgs,
    checkIfMember,
    sendRequest,
    handleCreateOrg
  } = useContext(OrgContext);



  const [search, setSearch] = useState("");
  const [hasRequest, setHasRequest] = useState(null);
  const searchRef = useRef();
  const [isOpen,setIsOpen]=useState(false)
  const [orgName,setOrgName]=useState("")



  useEffect(() => {
    const delay = setTimeout(() => {
      if (search.trim().length > 1) {
        getOrgsQuery(search);
      }
    }, 400);

    function handleClickSearch(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) setSearch("");
    }
    document.addEventListener("mousedown", handleClickSearch);
    return () => {
      clearTimeout(delay);
      document.removeEventListener("mousedown", handleClickSearch)
    }
  }, [search]);

  async function handleSelectOrg(org) {
    const res = await checkIfMember(org.slug);
    if (res === true) {
      setSearch("");
    } else {
      setHasRequest(org);
      setSearch("");
    }
  }

  function onClose(){
    setOrgName("")
    setIsOpen(false)
  }

  async function onCreate(){
    await handleCreateOrg(orgName)
    setOrgName("")
    setIsOpen(false)
  }

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      <CreateOrganizationModal onCreate={onCreate} onClose={onClose} isOpen={isOpen} orgName={orgName} setOrgName={setOrgName}/>
      <div className="max-w-2xl mx-auto space-y-6">

        {/* Search Card */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
          <h2 className="text-base font-semibold text-gray-800 mb-4">Find Organization</h2>

          <div className="flex gap-2 relative">
            <input
              className="flex-1 px-3.5 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              value={search}
              placeholder="Search by slug..."
              onChange={(e) => setSearch(e.target.value)}
            />

            <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition shrink-0" onClick={()=>setIsOpen(true)}>
              + New
            </button>

            {/* Search Results */}
            {search.trim().length > 1 && (
              <div ref={searchRef} className="absolute top-full mt-1.5 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50">
                {allOrgs.map((org) => (
                  <Link
                    href={`/dashboard/org/${org.id}`}
                    key={org.id}
                    className="px-4 py-2.5 flex justify-between text-sm hover:bg-gray-50 cursor-pointer transition"
                  >
                    <span className="font-medium text-gray-800">{org.name}</span>
                    <span className="text-gray-400">{org.slug}</span>
                    <span className="text-gray-300">{org.owner}</span>
                  </Link>
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
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
          <h2 className="text-base font-semibold text-gray-800 mb-4">
            Your Organizations
          </h2>

          {allUserOrgs && (
            <div className="flex flex-col gap-1">
              {allUserOrgs.map((org) => (
                <Link
                  href={`/dashboard/org/${org.id}`}
                  onClick={() => handleSelectOrg(org)}
                  key={org.id}
                  className="flex justify-between items-center px-4 py-3 rounded-lg hover:bg-gray-50 cursor-pointer transition"
                >
                  <div>
                    <div className="text-sm font-medium text-gray-800">
                      {org.name}
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">
                      {org.slug}
                    </div>
                  </div>

                  <div className="text-xs text-gray-400">
                    {org.owner}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}