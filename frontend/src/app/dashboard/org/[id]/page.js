"use client";

import React, { useMemo, useState } from "react";
import {
  Bell,
  MoreVertical,
  Pencil,
  ChevronDown,
} from "lucide-react";

export default function OrganizationInfoPage() {
  const [editing, setEditing] = useState(false);
  const [orgName, setOrgName] = useState("Aura Labs");

  const [sortBy, setSortBy] = useState("name");
  const [order, setOrder] = useState("asc");

  const members = [
    {
      id: 1,
      name: "Ronie",
      role: "Owner",
    },
    {
      id: 2,
      name: "Arjun",
      role: "Admin",
    },
    {
      id: 3,
      name: "Karan",
      role: "Member",
    },
    {
      id: 4,
      name: "Zayan",
      role: "Member",
    },
  ];

  const projects = [
    "Aura Nexus",
    "ROV Dashboard",
    "Realtime Chat",
    "Telemetry System",
  ];

  const sortedMembers = useMemo(() => {
    return [...members].sort((a, b) => {
      const valA = a[sortBy].toLowerCase();
      const valB = b[sortBy].toLowerCase();

      if (order === "asc") {
        return valA.localeCompare(valB);
      }

      return valB.localeCompare(valA);
    });
  }, [sortBy, order]);

  return (
    <div className="min-h-screen bg-[#f5f5f5] p-6">
      <div className="mx-auto max-w-6xl space-y-6">

        {/* Top Section */}
        <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">

            <div className="space-y-3">
              {!editing ? (
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold text-black">
                    {orgName}
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
                    value={orgName}
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
                  Ronie
                </span>
              </p>
            </div>

            {/* Request Bell */}
            <button className="relative rounded-xl border border-black/10 p-3 hover:bg-black/5 transition">
              <Bell size={20} />

              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black text-xs text-white">
                3
              </span>
            </button>
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
                {members.length} members in this organization
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
                  <option value="name">Sort by Name</option>
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
                    {member.name}
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
              {projects.length}
            </span>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {projects.map((project, index) => (
              <div
                key={index}
                className="rounded-xl border border-black/10 px-4 py-4 hover:bg-neutral-50 transition"
              >
                <h3 className="font-medium text-black">
                  {project}
                </h3>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}