"use client";

import React, { useContext, useState } from "react";
import { OrgContext } from "@/context/OrgContext";
import { TaskContext } from "@/context/TaskContext";

export default function NewTaskForm({ setNewTask }) {
  const { allProjects } = useContext(OrgContext);
  const { handleCreateTask } = useContext(TaskContext)
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
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 w-full max-w-md relative">
      <button
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition text-sm"
        onClick={() => setNewTask(false)}
      >
        ✕
      </button>

      <h2 className="text-base font-semibold mb-5 text-gray-800">Create Task</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
        {/* Description */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-gray-500">Description</label>
          <input
            name="desc"
            placeholder="Task description"
            value={form.desc}
            onChange={handleChange}
            className="border border-gray-200 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Deadline */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-gray-500">Deadline</label>
          <input
            type="datetime-local"
            name="deadline"
            value={form.deadline}
            onChange={handleChange}
            className="border border-gray-200 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Assigned To */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-gray-500">Assigned To</label>
          <input
            name="assignedTo"
            placeholder="Assign to (username)"
            value={form.assignedTo}
            onChange={handleChange}
            className="border border-gray-200 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Priority */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-gray-500">Priority</label>
          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="border border-gray-200 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>

        {/* Project Selector */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-gray-500">Project</label>

          {allProjects && allProjects.length > 0 && 
            <select
              name="project"
              value={form.project}
              onChange={handleChange}
              className="border border-gray-200 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Project</option>
              {allProjects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          }
          {allProjects && allProjects.length <= 0 &&
            <select
              value={form.project}
              onChange={(e) => {
                handleChange;
              }}
              className="border border-gray-200 px-3 py-2 rounded-lg text-sm"
            >
              <option>No Project available</option>
            </select>
          }
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-blue-700 transition mt-1"
        >
          Create Task
        </button>
      </form>
    </div>
  );
}
