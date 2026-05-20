import React, { useState } from 'react'

export default function OrgRequest({ org, setHasRequest, sendRequest }) {
  const [msg, setMsg] = useState("")

  function handleOnSubmit(e) {
    e.preventDefault()
    sendRequest(org.slug, msg)
    setHasRequest(null)
  }

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
      
      {/* Modal Card */}
      <form
        onSubmit={handleOnSubmit}
        className="w-full max-w-md bg-white rounded-xl shadow-xl p-6 flex flex-col gap-4"
      >
        
        {/* Title */}
        <h2 className="text-base font-semibold text-gray-800">
          Request to join {org.name}
        </h2>

        {/* Textarea */}
        <textarea
          className="w-full h-28 px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition"
          placeholder="Write a message (optional)"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setHasRequest(null)}
            className="px-4 py-2 text-sm font-medium rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Send Request
          </button>
        </div>
      </form>
    </div>
  )
}