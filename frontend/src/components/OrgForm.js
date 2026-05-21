"use client";

import React from "react";
import { X } from "lucide-react";

export default function CreateOrganizationModal({
  isOpen,
  onClose,
  onCreate,
  orgName,
  setOrgName,
}) {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!orgName.trim()) return;

    onCreate(orgName);
    setOrgName("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm">
      <div className="w-[90%] max-w-md rounded-2xl border border-black/10 bg-white p-6 shadow-2xl">

        {/* Top Bar */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-black">
            Create Organization
          </h2>

          <button
            onClick={onClose}
            className="rounded-full p-1 text-black transition hover:bg-black/10"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm text-gray-700">
              Organization Name
            </label>

            <input
              type="text"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              placeholder="Enter organization name"
              className="w-full rounded-xl border border-black/20 bg-white px-4 py-3 text-black outline-none transition placeholder:text-gray-400 focus:border-black"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-800"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
}