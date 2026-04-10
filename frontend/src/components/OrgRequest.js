import React, { useState } from 'react'

export default function OrgRequest({ org, setHasRequest, sendRequest }) {
  const [msg, setMsg] = useState("")

  function handleOnSubmit(e) {
    e.preventDefault()
    sendRequest(org.slug, msg)
    setHasRequest(null)
  }

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      
      {/* Modal Card */}
      <form
        onSubmit={handleOnSubmit}
        className="w-[400px] bg-white rounded-xl shadow-lg p-6 flex flex-col gap-4"
      >
        
        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-800">
          Request to join {org.name}
        </h2>

        {/* Textarea */}
        <textarea
          className="w-full h-32 px-3 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="Write a message (optional)"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          
          <button
            type="button"
            onClick={() => setHasRequest(null)}
            className="px-4 py-2 text-sm rounded-lg bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Send Request
          </button>

        </div>
      </form>
    </div>
  )
}