"use client";

import React, { useContext, useState } from "react";
import { OrgContext } from "@/context/OrgContext";
import { TaskContext } from "@/context/TaskContext";

export default function NewTaskForm({  setNewTask }) {
  const { allProjects } = useContext(OrgContext);
  const {handleCreateTask}=useContext(TaskContext)
  const [form, setForm] = useState({
    desc: "",
    deadline: "",
    assignedTo: "",
    priority: "MEDIUM",
    project: -1,
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(form)
    handleCreateTask(form)
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-md relative">
      <button
        className="absolute top-3 right-3 text-gray-500 hover:text-black"
        onClick={() => setNewTask(false)}
      >
        ✕
      </button>
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Create Task</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Description */}
        <input
          name="desc"
          placeholder="Task description"
          value={form.desc}
          onChange={handleChange}
          className="border p-2 rounded-lg"
          required
        />

        {/* Deadline */}
        <input
          type="datetime-local"
          name="deadline"
          value={form.deadline}
          onChange={handleChange}
          className="border p-2 rounded-lg"
        />

        {/* Assigned To */}
        <input
          name="assignedTo"
          placeholder="Assign to (username)"
          value={form.assignedTo}
          onChange={handleChange}
          className="border p-2 rounded-lg"
        />

        {/* Priority */}
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

        

        {/* Org Selector (from Team Menu idea) */}
        <div>
          <label className="text-sm text-gray-600 ">Project</label>

          {allProjects && allProjects.length > 0 && 
            <select
              name="project"
              value={form.project}
              onChange={handleChange}
              className="border p-2 rounded-lg w-full"
>
              <option value="">Select Project</option>
              {allProjects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          }
          {allProjects&&allProjects.length<=0&&
            <select
              value={form.project}
              onChange={(e) => {
                handleChange;
              }}
              className="border p-2 rounded-lg w-full"
            >
              <option>No Project available</option>
              
            </select>
          }
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Create Task
        </button>
      </form>
    </div>
  );
}
