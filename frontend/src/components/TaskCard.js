import { OrgContext } from '@/context/OrgContext';
import React, { useContext } from 'react'
import toast from 'react-hot-toast';

export default function TaskCard({task, setEditTask}) {
    const {org} = useContext(OrgContext)

    function getDate(dateTime){
        return new Date(dateTime).toLocaleDateString();
    }
    function getTime(dateTime){
        return new Date(dateTime).toLocaleTimeString("en-us",{hour:"2-digit",minute:"2-digit",});
    }

  return (
    <div
      className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex flex-col gap-3 hover:shadow-md transition cursor-pointer"
      onClick={()=>{
        if(org&&org.name===task.orgName){
          setEditTask(task)
        }
        else{
            toast.error("Select the appropriate Team")
        }
      }}
    >
      {/* Title */}
      <div className="font-semibold text-sm text-gray-800 line-clamp-2 leading-snug">
        {task.desc}
      </div>

      {/* Org */}
      <div className="text-xs text-gray-500">
        {task.orgName}
      </div>

      {/* Date + Time */}
      <div className="text-xs text-gray-500">
        {getDate(task.deadline)} • {getTime(task.deadline)}
      </div>

      {/* Status + Priority */}
      <div className="flex justify-between items-center mt-auto pt-2 border-t border-gray-100">
        <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-medium">
          {task.status}
        </span>

        <span className="text-xs px-2 py-0.5 rounded-full bg-red-50 text-red-600 font-medium">
          {task.priority}
        </span>
      </div>
    </div>
  )
}
