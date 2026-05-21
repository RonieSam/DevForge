"use client";

import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  Bell,
  MoreVertical,
  Pencil,
  ChevronDown,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { getOrg, reviewRequest } from "@/api/orgApi";
import toast from "react-hot-toast";
import { AuthContext } from "@/context/AuthProvider";

export default function OrganizationInfoPage() {
  const params=useParams();
  const [editing, setEditing] = useState(false);
  const [org, setOrg] = useState(null);
  const [showRequests, setShowRequests] = useState(false);

  const [sortBy, setSortBy] = useState("name");
  const [order, setOrder] = useState("asc");
  const router=useRouter()

  const {setLoading}=useContext(AuthContext)
  useEffect(()=>{
    async function initialize(){
      try{
        const data=await getOrg(params.id);
        console.log(data)
        setOrg(data)
      }catch(e){
        toast.error("Couldn't load organization",{id:"orgError"})
        router.push("/dashboard")
      }
    }
    setLoading(true)
    initialize()
    setLoading(false)
  },[])

  const handleRequestAction = (requestId) => {
    setOrg((prev) => ({
      ...prev,
      requests: prev.requests.filter(
        (request) => request.id !== requestId
      ),
    }));
  };
  const sortedMembers = useMemo(() => {
  if (!org?.members) return [];

  return [...org.members].sort((a, b) => {
    const valA = a[sortBy]?.toLowerCase() || "";
    const valB = b[sortBy]?.toLowerCase() || "";

    if (order === "asc") {
      return valA.localeCompare(valB);
    }

    return valB.localeCompare(valA);
  });
}, [org, sortBy, order]);
  return (
    <div className="min-h-screen bg-[#f5f5f5] p-6">
      {org&&<div className="mx-auto max-w-6xl space-y-6">

        {/* Top Section */}
        <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">

            <div className="space-y-3">
              {!editing ? (
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold text-black">
                    {org.name}
                  </h1>

                  <button
                    onClick={() => setEditing(true)}
                    className="rounded-lg border border-black/10 p-2 hover:bg-black/5 transition"
                  >
                    <Pencil size={16} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <input
                    value={org.name}
                    onChange={(e) => setOrgName(e.target.value)}
                    className="rounded-xl border border-black/20 px-4 py-2 text-xl font-semibold outline-none focus:border-black"
                  />

                  <button
                    onClick={() => setEditing(false)}
                    className="rounded-xl bg-black px-4 py-2 text-sm text-white hover:bg-neutral-800 transition"
                  >
                    Save
                  </button>
                </div>
              )}

              <p className="text-sm text-neutral-500">
                Created by{" "}
                <span className="font-medium text-black">
                 {org.creator}
                </span>
              </p>
            </div>

            {/* Request Bell */}
            {/* Request Bell */}
<div className="relative">
  <button
    onClick={() => setShowRequests((prev) => !prev)}
    className="relative rounded-xl border border-black/10 p-3 transition hover:bg-black/5"
  >
    <Bell size={20} />

    {org.requests?.length > 0 && (
      <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black text-xs text-white">
        {org.requests.length}
      </span>
    )}
  </button>

  {/* Requests Popup */}
  {showRequests && (
    <div className="absolute right-0 top-16 z-50 w-96 overflow-hidden rounded-2xl border border-black/10 bg-white shadow-2xl">
      
      <div className="border-b border-black/10 px-5 py-4">
        <h2 className="text-lg font-semibold text-black">
          Join Requests
        </h2>

        <p className="text-sm text-neutral-500">
          {org.requests?.length || 0} pending requests
        </p>
      </div>

      <div className="max-h-[400px] overflow-y-auto">
        
        {org.requests?.length === 0 && (
          <div className="px-5 py-10 text-center text-sm text-neutral-500">
            No pending requests
          </div>
        )}

        {org.requests?.map((request) => (
          <div
            key={request.id}
            className="border-b border-black/5 px-5 py-4 last:border-none"
          >
            <div className="flex items-start justify-between gap-4">

              <div className="min-w-0 flex-1">
                <h3 className="font-medium text-black">
                  {request.username}
                </h3>

                <p className="mt-1 text-sm text-neutral-500 break-words">
                  {request.msg}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">

                {/* Accept */}
                <button
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-100 text-green-600 transition hover:bg-green-200"
                  onClick={() => {
                    reviewRequest(request.id,"APPROVED")
                    handleRequestAction(request.id)
                  }}
                >
                  ✓
                </button>

                {/* Reject */}
                <button
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-100 text-red-500 transition hover:bg-red-200"
                  onClick={() => {
                    reviewRequest(request.id,"REJECTED")
                    handleRequestAction(request.id)
                  }}
                >
                  ✕
                </button>

              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  )}
</div>
          </div>
        </div>

        {/* Members */}
        <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">

          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <div>
              <h2 className="text-2xl font-semibold text-black">
                Members
              </h2>

              <p className="text-sm text-neutral-500 mt-1">
                {org.members.length} members in this organization
              </p>
            </div>

            {/* Sorting */}
            <div className="flex gap-3">

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none rounded-xl border border-black/10 bg-white px-4 py-2 pr-10 text-sm outline-none"
                >
                  <option value="username">Sort by Username</option>
                  <option value="role">Sort by Role</option>
                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
                />
              </div>

              <div className="relative">
                <select
                  value={order}
                  onChange={(e) => setOrder(e.target.value)}
                  className="appearance-none rounded-xl border border-black/10 bg-white px-4 py-2 pr-10 text-sm outline-none"
                >
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
                />
              </div>

            </div>
          </div>

          {/* Member List */}
          <div className="space-y-3">

            {sortedMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between rounded-xl border border-black/10 px-4 py-4 hover:bg-neutral-50 transition"
              >

                <div>
                  <h3 className="font-medium text-black">
                    {member.username}
                  </h3>

                  <p className="text-sm text-neutral-500">
                    {member.role}
                  </p>
                </div>

                {/* Actions */}
                <div className="relative group">
                  <button className="rounded-lg p-2 hover:bg-black/5 transition">
                    <MoreVertical size={18} />
                  </button>

                  <div className="absolute right-0 top-11 hidden w-40 overflow-hidden rounded-xl border border-black/10 bg-white shadow-lg group-hover:block">

                    <button className="w-full px-4 py-3 text-left text-sm hover:bg-neutral-100 transition">
                      Promote
                    </button>

                    <button className="w-full px-4 py-3 text-left text-sm text-red-500 hover:bg-red-50 transition">
                      Remove
                    </button>

                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>

        {/* Projects */}
        <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">

          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-black">
              Projects
            </h2>

            <span className="rounded-full bg-black px-3 py-1 text-xs text-white">
              {org.projects.length}
            </span>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {org.projects.map((project, index) => (
              <div
                key={index}
                className="rounded-xl border border-black/10 px-4 py-4 hover:bg-neutral-50 transition"
              >
                <h3 className="font-medium text-black">
                  {project.name}
                </h3>
              </div>
            ))}
          </div>
        </div>

      </div>}
    </div>
  );
}