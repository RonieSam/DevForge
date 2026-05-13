"use client";

import React, { useContext, useState } from "react";
import { OrgContext } from "@/context/OrgContext";
import { TaskContext } from "@/context/TaskContext";

export default function EditTask({  setEditTask , task }) {
  const {handleUpdateTask,handleDeleteTask}=useContext(TaskContext)
  const [action,setAction]=useState("")
  const {org}=useContext(OrgContext)
  const [form, setForm] = useState({
    id:task.id,
    desc: task.desc,
    deadline: task.deadline,
    assignedTo: task.assignedTo,
    priority: task.priority,
    status:task.status
  });

    
  
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if(action==="save"){
        handleUpdateTask(form)
        setEditTask(null)
    }
    else if(action==="status"){
        handleUpdateTask(form)
        setEditTask(null)
    }
    else{
        handleDeleteTask(task.id)
        setEditTask(null)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-md relative">
      <button
        className="absolute top-3 right-3 text-gray-500 hover:text-black"
        onClick={() => setEditTask(false)}
      >
        ✕
      </button>
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Create Task</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Description */}
        {org.perms.includes("TASK_UPDATE")?
        <>
        <input
          name="desc"
          placeholder="Task description"
          value={form.desc}
          onChange={handleChange}
          className="border p-2 rounded-lg"
          required
        />

        <input
          type="datetime-local"
          name="deadline"
          value={form.deadline}
          onChange={handleChange}
          className="border p-2 rounded-lg"
        />

        <input
          name="assignedTo"
          placeholder="Assign to (username)"
          value={form.assignedTo}
          onChange={handleChange}
          className="border p-2 rounded-lg"
        />

        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          className="border p-2 rounded-lg"
        >
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>
       

        
        </>
    :
     <>
         <div className="space-y-4 text-sm">

  <div>
    <p className="text-gray-500 font-medium">Description</p>
    <p className="text-gray-900 mt-1">{form.desc}</p>
  </div>

  <div className="grid grid-cols-2 gap-4">

    <div>
      <p className="text-gray-500 font-medium">Deadline</p>
      <p className="text-gray-900 mt-1">
        {new Date(form.deadline).toLocaleString()}
      </p>
    </div>

    <div>
      <p className="text-gray-500 font-medium">Priority</p>

      <span
        className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-semibold
        ${
          form.priority === "HIGH"
            ? "bg-red-100 text-red-700"
            : form.priority === "MEDIUM"
            ? "bg-yellow-100 text-yellow-700"
            : "bg-green-100 text-green-700"
        }`}
      >
        {form.priority}
      </span>
    </div>

  </div>

  <div>
    <p className="text-gray-500 font-medium">Assigned To</p>
    <p className="text-gray-900 mt-1">{form.assignedTo}</p>
  </div>

</div>
     </>
    }
    <div className="flex justify-around">
        {task.status==="INPROGRESS"&&
        <button
        type="submit"
        className="bg-green-600 text-white my-2 w-[30%] py-2 rounded-lg hover:bg-green-700 transition"
        onClick={()=>{
            setAction("status")
            setForm({...form,status:"UNDERREVIEW"})

        }}
        >
        Mark for review
        </button>
        }
        {task.status==="UNDERREVIEW"&&org.perms.includes("TASK_STATUS_UPDATE")&&
            <button
        type="submit"
        className="bg-green-600 text-white my-2 w-[30%] py-2 rounded-lg hover:bg-green-700 transition"
        onClick={()=>{
            setAction("status")
            setForm({...form,status:"COMPLETED"})
        }}

        >
        Mark as completed
        </button>
        }
        {org.perms.includes("TASK_UPDATE")&&
        <button
          type="submit"
          className="bg-blue-600 text-white my-2 w-[30%] py-2 rounded-lg hover:bg-blue-700 transition"
          onClick={()=>setAction("save")}
        >
          Save
        </button>}
        {org.perms.includes("TASK_DELETE")&&<button
          type="submit"
          className="bg-red-600 text-white my-2 w-[30%] py-2 rounded-lg hover:bg-red-700 transition"
          onClick={()=>setAction("delete")}
        >
          Delete
        </button>}

      </div>
    </form>
    </div>
  );
}
