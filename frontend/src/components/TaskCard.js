import React from 'react'

export default function TaskCard({task}) {

    function getDate(dateTime){
        return new Date(dateTime).toLocaleDateString();
    }
    function getTime(dateTime){
        return new Date(dateTime).toLocaleTimeString("en-us",{hour:"2-digit",minute:"2-digit",});
    }
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 w-64 flex flex-col gap-3 hover:shadow-md transition">
  
  {/* Title */}
  <div className="font-semibold text-gray-800 line-clamp-2">
    {task.desc}
  </div>

  {/* Org */}
  <div className="text-sm text-gray-500">
    {task.orgName}
  </div>

  {/* Date + Time */}
  <div className="text-sm text-gray-600">
    {getDate(task.deadline)} • {getTime(task.deadline)}
  </div>

  {/* Status + Priority */}
  <div className="flex justify-between items-center mt-auto">
    
    <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">
      {task.status}
    </span>

    <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-600">
      {task.priority}
    </span>

  </div>
</div>
  )
}
